import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = {
  bodyBytes: 8_192,
  name: 100,
  email: 254,
  message: 2_000,
} as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_CLIENTS = 10_000;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

type RateLimitEntry = { count: number; resetAt: number };
const globalRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimit = globalRateLimit.contactRateLimit ?? new Map<string, RateLimitEntry>();
globalRateLimit.contactRateLimit = rateLimit;

let supabase: SupabaseClient | null = null;

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClient(): SupabaseClient | null {
  if (supabase) return supabase;

  const isProduction = process.env.NODE_ENV === "production";
  // Production requires server-only configuration. The public fallbacks exist
  // solely to ease local migration from the previous browser-direct form.
  const url =
    process.env.SUPABASE_URL ??
    (isProduction ? undefined : process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    (isProduction ? undefined : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !key) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" && isProduction) {
      return null;
    }
  } catch {
    return null;
  }

  supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabase;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function consumeRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    if (rateLimit.size >= RATE_LIMIT_MAX_CLIENTS) {
      for (const [key, entry] of rateLimit) {
        if (entry.resetAt <= now) rateLimit.delete(key);
      }
      // Bound memory even if a direct-hosting setup accepts spoofed proxy headers.
      if (rateLimit.size >= RATE_LIMIT_MAX_CLIENTS) rateLimit.clear();
    }
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function validate(payload: unknown):
  | { data: ContactPayload; error?: never }
  | { data?: never; error: string } {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { error: "Invalid request body." };
  }

  const candidate = payload as Record<string, unknown>;
  if (
    typeof candidate.name !== "string" ||
    typeof candidate.email !== "string" ||
    typeof candidate.message !== "string" ||
    (candidate.website !== undefined && typeof candidate.website !== "string")
  ) {
    return { error: "Invalid request body." };
  }

  const data = {
    name: candidate.name.trim(),
    email: candidate.email.trim(),
    message: candidate.message.trim(),
    website: candidate.website?.trim() ?? "",
  };

  if (!data.name) return { error: "Please enter your name." };
  if (data.name.length > LIMITS.name) return { error: "Name is too long." };
  if (!data.email || data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!data.message) return { error: "Please enter a message." };
  if (data.message.length > LIMITS.message) {
    return { error: "Message is too long (max 2000 characters)." };
  }

  return { data };
}

async function readJsonBody(
  request: NextRequest,
): Promise<{ body: unknown; error?: never } | { body?: never; error: string; status: number }> {
  if (!request.body) return { error: "Invalid JSON.", status: 400 };

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytesRead = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bytesRead += value.byteLength;
      if (bytesRead > LIMITS.bodyBytes) {
        await reader.cancel();
        return { error: "Request body is too large.", status: 413 };
      }

      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return { body: JSON.parse(text) as unknown };
  } catch {
    return { error: "Invalid JSON.", status: 400 };
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > LIMITS.bodyBytes) {
    return json({ error: "Request body is too large." }, 413);
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") {
    return json({ error: "Cross-site submissions are not allowed." }, 403);
  }

  const parsedBody = await readJsonBody(request);
  if ("status" in parsedBody) return json({ error: parsedBody.error }, parsedBody.status);

  const result = validate(parsedBody.body);
  if ("error" in result) return json({ error: result.error }, 400);

  // Silently accept honeypot submissions without touching the database.
  if (result.data.website) return json({ ok: true }, 200);

  const limit = consumeRateLimit(getClientIp(request));
  if (!limit.allowed) {
    return json(
      { error: "Too many messages. Please try again later." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const client = getClient();
  if (!client) {
    return json({ error: "Contact form is temporarily unavailable." }, 503);
  }

  let databaseError: { code?: string } | null = null;
  try {
    const { error } = await client
      .from("contacts")
      .insert({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      })
      .abortSignal(AbortSignal.timeout(8_000));
    databaseError = error;
  } catch {
    console.error("Contact submission failed: network error");
    return json({ error: "Contact form is temporarily unavailable." }, 503);
  }

  if (databaseError) {
    console.error("Contact submission failed:", databaseError.code);
    return json({ error: "Contact form is temporarily unavailable." }, 503);
  }

  return json({ ok: true }, 201);
}

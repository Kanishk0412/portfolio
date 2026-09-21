import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.instagram.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://ui-avatars.com https://*.instagram.com https://*.cdninstagram.com https://*.fbcdn.net",
  "font-src 'self' data:",
  "connect-src 'self' https://*.instagram.com https://*.cdninstagram.com",
  "frame-src https://*.instagram.com",
  "media-src 'self' https://*.cdninstagram.com https://*.fbcdn.net",
  "upgrade-insecure-requests",
].join("; ");

// Security headers applied to every response. These are intentionally
// framework-safe: they harden the site without breaking the third-party
// Instagram embeds or client-side animations used on the site.
const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Stop the site from being framed by others (clickjacking protection).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Don't let browsers MIME-sniff responses away from their declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin as referrer to cross-origin destinations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful features this static site never needs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  // Enforce HTTPS for two years, including subdomains.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

const subscribe = (onChange: () => void) => {
  const interval = setInterval(onChange, 15_000);
  return () => clearInterval(interval);
};

// Rounded to the minute so React sees a stable value between ticks.
const getTime = () => formatter.format(new Date()).toUpperCase();

/** Current time in India. Renders nothing on the server, where the time would be stale. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, () => null);
  if (!time) return null;
  return (
    <time className={className} suppressHydrationWarning>
      {time} IST
    </time>
  );
}

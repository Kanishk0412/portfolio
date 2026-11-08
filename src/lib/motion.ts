import type { PointerEvent } from "react";
import type { Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.5,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/**
 * Feeds the cursor position to the `.card-glow` CSS class. Writing CSS variables
 * directly means the glow follows the cursor without re-rendering the card.
 */
export function trackCursorGlow(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
}

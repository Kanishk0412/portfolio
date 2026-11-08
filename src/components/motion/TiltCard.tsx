"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { trackCursorGlow } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 180, damping: 20, mass: 0.5 };

/** Card with a subtle 3D tilt and cursor glow. Mouse only, and off for reduced motion. */
export function TiltCard({
  children,
  className,
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, SPRING);
  const rotateY = useSpring(rawY, SPRING);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    trackCursorGlow(event);
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(-offsetY * maxTilt * 2);
    rawY.set(offsetX * maxTilt * 2);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("card-glow", className)}
    >
      {children}
    </motion.div>
  );
}

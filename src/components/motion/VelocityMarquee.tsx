"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/** One row of text that drifts on its own and speeds up with the visitor's scrolling. */
function Row({ items, baseVelocity, className }: { items: string[]; baseVelocity: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  // The content is repeated four times, so one quarter is one full loop.
  const x = useTransform(baseX, (value) => `${wrap(-25, -50, value)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const content = items.map((item) => (
    <span key={item} className="flex items-center">
      {item}
      <span className="mx-6 text-[0.5em] md:mx-10">✦</span>
    </span>
  ));

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div style={{ x }} className="flex shrink-0">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0">
            {content}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const ROW_ONE = ["Developer", "Tech Speaker", "Community Builder"];
const ROW_TWO = ["Hackathon Judge", "Mentor", "Organizer"];

/** Two crossing ribbons of oversized text between home page sections. */
export function VelocityMarquee() {
  return (
    <section aria-label="Roles" className="relative overflow-hidden py-10 md:py-16">
      <p className="sr-only">{[...ROW_ONE, ...ROW_TWO].join(", ")}</p>
      <div aria-hidden="true" className="select-none">
        <div className="relative z-10 -mx-4 -rotate-2 bg-brand-primary py-3 shadow-2xl shadow-black/50 md:py-5">
          <Row
            items={ROW_ONE}
            baseVelocity={-3}
            className="font-display text-4xl font-bold uppercase tracking-tight text-on-brand md:text-7xl"
          />
        </div>
        <div className="-mx-4 -mt-1 rotate-1 border-y border-white/10 bg-card-bg py-3 md:py-5">
          <Row
            items={ROW_TWO}
            baseVelocity={3}
            className="font-serif text-4xl italic text-foreground/85 md:text-7xl"
          />
        </div>
      </div>
    </section>
  );
}

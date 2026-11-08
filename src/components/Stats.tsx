"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { DURATION, EASE_OUT } from "@/lib/motion";

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  index: number;
}

const Stat = ({ label, value, suffix, index }: StatProps) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true });

  useEffect(() => {
    const number = numberRef.current;
    if (!isInView || !number) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The markup already holds the final value, so it is correct without JS.
    const controls = animate(0, value, {
      duration: 1.2,
      delay: index * 0.1,
      ease: EASE_OUT,
      onUpdate: (latest) => {
        number.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: DURATION.base, delay: index * 0.1, ease: EASE_OUT }}
      className="glass p-6 rounded-2xl text-center flex flex-col items-center justify-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline tabular-nums">
        <span ref={numberRef}>{value}</span>
        <span className="text-brand-primary ml-1 text-2xl">{suffix}</span>
      </div>
      <div className="text-foreground/70 font-medium">{label}</div>
    </motion.div>
  );
};

export function Stats() {
  const stats = [
    { label: "Events Attended", value: 50, suffix: "+" },
    { label: "Talks Given", value: 15, suffix: "+" },
    { label: "Community Reach", value: 10, suffix: "k+" },
    { label: "Hackathons Judged", value: 9, suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, idx) => (
        <Stat key={stat.label} {...stat} index={idx} />
      ))}
    </div>
  );
}

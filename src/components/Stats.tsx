"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { CalendarCheck, Gavel, Mic, Users, type LucideIcon } from "lucide-react";
import { DURATION, EASE_OUT } from "@/lib/motion";

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  index: number;
}

const Stat = ({ label, value, suffix, icon: Icon, index }: StatProps) => {
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
      className="glass group relative overflow-hidden rounded-2xl p-6 text-center flex flex-col items-center justify-center transition-colors duration-300 hover:border-brand-primary/30"
    >
      {/* Accent edge that grows in on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-brand-primary to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
      <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brand-primary transition-colors duration-300 group-hover:border-brand-primary/40">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="text-4xl md:text-5xl font-bold font-display text-foreground mb-2 flex items-baseline tabular-nums">
        <span ref={numberRef}>{value}</span>
        <span className="text-brand-primary ml-1 text-2xl">{suffix}</span>
      </div>
      <div className="text-foreground/70 font-medium">{label}</div>
    </motion.div>
  );
};

export type StatItem = Omit<StatProps, "index">;

const HOME_STATS: StatItem[] = [
  { label: "Events Attended", value: 50, suffix: "+", icon: CalendarCheck },
  { label: "Talks Given", value: 15, suffix: "+", icon: Mic },
  { label: "Community Reach", value: 10, suffix: "k+", icon: Users },
  { label: "Hackathons Judged", value: 9, suffix: "+", icon: Gavel },
];

export function Stats({ stats = HOME_STATS }: { stats?: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, idx) => (
        <Stat key={stat.label} {...stat} index={idx} />
      ))}
    </div>
  );
}

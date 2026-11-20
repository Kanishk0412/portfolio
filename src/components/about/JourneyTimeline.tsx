"use client";

import { useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import { Briefcase, GraduationCap, Laptop, Mic2, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EVENTS_IN_LATEST_YEAR, LATEST_EVENT_YEAR } from "./aboutData";

type Milestone = { when: string; title: string; place: string; body: string; icon: LucideIcon };

const MILESTONES: Milestone[] = [
  {
    when: "2022",
    title: "Lead",
    place: "GDG on Campus UIET",
    body: "Led the campus developer community and created opportunities for students to learn, collaborate, and build together.",
    icon: Users,
  },
  {
    when: "2023",
    title: "Core Team Member",
    place: "GDG Cloud Chandigarh",
    body: "Joined the core team, contributing to community programs, technical sessions, and events. Still going.",
    icon: Users,
  },
  {
    when: "2024",
    title: "Bachelor of Engineering",
    place: "UIET, Panjab University",
    body: "Graduated with a B.E., after years of building alongside my studies.",
    icon: GraduationCap,
  },
  {
    when: "Apr 2026",
    title: "Sr. CSA",
    place: "Prodege",
    body: "Joined Prodege, where I work today.",
    icon: Briefcase,
  },
  {
    when: String(LATEST_EVENT_YEAR),
    title: "A year on stage",
    place: `${EVENTS_IN_LATEST_YEAR} events`,
    body: "Speaking, judging hackathons, mentoring builders, and organizing community events.",
    icon: Mic2,
  },
  {
    when: "Ongoing",
    title: "Freelance Full-Stack Developer",
    place: "Independent",
    body: "Building end-to-end websites and web applications tailored to each client's goals.",
    icon: Laptop,
  },
];

/** One step; it lights up while it sits in the middle band of the screen. */
function Step({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const Icon = milestone.icon;

  return (
    <li ref={ref} className="relative grid gap-2 pl-14 md:grid-cols-[10rem_1fr] md:gap-16 md:pl-0">
      <p
        className={cn(
          "font-display text-2xl font-bold transition-colors duration-500 md:pt-5 md:text-right md:text-3xl",
          active ? "text-brand-primary" : "text-foreground/25"
        )}
      >
        {milestone.when}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 md:left-[12rem] md:top-4 md:-translate-x-1/2",
          active ? "scale-110 border-brand-primary bg-brand-primary text-on-brand" : "border-card-border bg-background text-foreground/50"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.02 }}
        className={cn(
          "rounded-2xl border p-6 transition-colors duration-500",
          active ? "border-brand-primary/40 bg-card-bg" : "border-card-border bg-card-bg/50"
        )}
      >
        <h3 className="text-xl font-bold">{milestone.title}</h3>
        <p className="mt-1 font-medium text-brand-secondary">{milestone.place}</p>
        <p className="mt-3 leading-relaxed text-foreground/70">{milestone.body}</p>
      </motion.div>
    </li>
  );
}

export function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-card-border md:left-[12rem]">
        <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-gradient-to-b from-brand-primary to-brand-secondary motion-reduce:hidden" />
      </div>
      <ol className="space-y-8">
        {MILESTONES.map((milestone, index) => (
          <Step key={`${milestone.when}-${milestone.title}`} milestone={milestone} index={index} />
        ))}
      </ol>
    </div>
  );
}

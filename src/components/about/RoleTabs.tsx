"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2, Mic2, Users, type LucideIcon } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { COMMUNITY_EXPERIENCE, EVENT_COUNTS, PROJECT_COUNT, SKILL_GROUPS, TALK_TOPICS } from "./aboutData";

type Role = {
  key: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  body: string;
  facts: { value: number; label: string }[];
  list: readonly string[];
  link: { href: string; label: string };
};

const ROLES: Role[] = [
  {
    key: "developer",
    label: "Developer",
    icon: Code2,
    headline: "Turning ideas into useful digital products.",
    body: "As a freelance full-stack developer I build end-to-end websites and web applications tailored to each client's goals, from fintech and property management to immersive creative sites.",
    facts: [{ value: PROJECT_COUNT, label: "Projects on GitHub" }],
    list: SKILL_GROUPS.Web,
    link: { href: "/projects", label: "Browse my projects" },
  },
  {
    key: "speaker",
    label: "Speaker",
    icon: Mic2,
    headline: "Practical sessions that turn concepts into working projects.",
    body: "With 3+ years of hands-on experience across AI, web, and data, I share what I learn through technical talks for students and developers.",
    facts: [
      { value: EVENT_COUNTS.speaker, label: "Speaking events" },
      { value: EVENT_COUNTS.judge, label: "Hackathons judged" },
    ],
    list: TALK_TOPICS,
    link: { href: "/events", label: "See my talks" },
  },
  {
    key: "community",
    label: "Community builder",
    icon: Users,
    headline: "Creating spaces where developers learn from one another.",
    body: "From leading a campus chapter to organizing developer events across Chandigarh and Delhi, community has shaped how I learn and build.",
    facts: [
      { value: EVENT_COUNTS.organizer, label: "Events organized" },
      { value: EVENT_COUNTS.mentor, label: "Times mentoring" },
    ],
    list: COMMUNITY_EXPERIENCE.map((item) => item.community),
    link: { href: "/events", label: "Explore my events" },
  },
];

/** "Three hats" switcher: one panel per role, with arrow-key navigation between tabs. */
export function RoleTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const role = ROLES[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + ROLES.length) % ROLES.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div role="tablist" aria-orientation="vertical" aria-label="Roles" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {ROLES.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.key}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative isolate flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors lg:px-6 lg:py-6",
                selected ? "border-transparent" : "border-card-border hover:border-brand-primary/40"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="role-tab-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-2xl border border-brand-primary/40 bg-brand-primary/10"
                />
              )}
              <span className={cn("hidden font-mono text-sm lg:block", selected ? "text-brand-primary" : "text-foreground/40")}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <item.icon className={cn("h-5 w-5 shrink-0", selected ? "text-brand-primary" : "text-foreground/50")} aria-hidden="true" />
              <span className={cn("font-display text-lg font-semibold lg:text-2xl", selected ? "text-foreground" : "text-foreground/60")}>
                {item.label}
              </span>
              <ArrowRight
                className={cn(
                  "ml-auto hidden h-5 w-5 transition-all lg:block",
                  selected ? "translate-x-0 text-brand-primary opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-card-border bg-card-bg p-7 md:p-10"
      >
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-primary)_14%,transparent),transparent_70%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={role.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="relative"
          >
            <h3 className="max-w-lg text-2xl font-bold leading-tight md:text-3xl">{role.headline}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">{role.body}</p>

            <dl className="mt-8 flex flex-wrap gap-8">
              {role.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-foreground/60">{fact.label}</dt>
                  <dd className="font-display text-5xl font-bold text-brand-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {role.list.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.25 }}
                  className="rounded-full border border-card-border bg-background px-3.5 py-1.5 text-sm text-foreground/85"
                >
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href={role.link.href}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-brand-primary"
            >
              {role.link.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

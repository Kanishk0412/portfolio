"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Bot, Globe, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SKILL_GROUPS } from "./aboutData";

type Group = keyof typeof SKILL_GROUPS;
type Filter = "All" | Group;

const FILTERS: { key: Filter; icon: LucideIcon }[] = [
  { key: "All", icon: Layers },
  { key: "Web", icon: Globe },
  { key: "Data", icon: BarChart3 },
  { key: "AI", icon: Bot },
];

const SKILLS = (Object.entries(SKILL_GROUPS) as [Group, readonly string[]][]).flatMap(([group, skills]) =>
  skills.map((name) => ({ name, group }))
);

/** Every skill stays on screen; choosing a group lights up its skills and dims the rest. */
export function SkillExplorer() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {FILTERS.map(({ key, icon: Icon }) => {
          const selected = filter === key;
          const count = key === "All" ? SKILLS.length : SKILL_GROUPS[key].length;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(key)}
              className={cn(
                "relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected ? "border-transparent text-on-brand" : "border-card-border text-foreground/75 hover:border-brand-primary/50"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="skill-filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute -inset-px -z-10 rounded-full bg-brand-primary"
                />
              )}
              <Icon className="h-4 w-4" aria-hidden="true" />
              {key}
              <span className="font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {SKILLS.map((skill, index) => {
          const lit = filter === "All" || filter === skill.group;
          return (
            <motion.li
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.025 }}
            >
              <div
                className={cn(
                  "group flex h-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300",
                  lit
                    ? "border-card-border bg-card-bg hover:-translate-y-0.5 hover:border-brand-primary/50"
                    : "scale-[0.97] border-transparent bg-card-bg/30 opacity-30"
                )}
              >
                <span className="font-medium">{skill.name}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-wider transition-colors",
                    lit ? "text-brand-primary" : "text-foreground/40"
                  )}
                >
                  {skill.group}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Gavel, Globe2, Mic2, Users } from "lucide-react";
import type { EventRole } from "@/components/EventCard";
import { TiltCard } from "@/components/motion/TiltCard";
import { INSTAGRAM_EVENTS } from "@/data/events";
import { SKILLS } from "@/data/skills";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const countRole = (role: EventRole) =>
  INSTAGRAM_EVENTS.filter((event) => [event.role].flat().includes(role)).length;

const DEPLOYS = ["dair-studios", "cashiogold", "pg-manager"];
const EQ_BARS = [0.55, 0.9, 0.4, 1, 0.65, 0.85, 0.35, 0.75, 0.5, 0.95, 0.6, 0.8, 0.45, 0.7];
const NETWORK = [
  { x: 40, y: 34 },
  { x: 160, y: 22 },
  { x: 262, y: 44 },
  { x: 70, y: 112 },
  { x: 236, y: 118 },
];

function Card({
  icon: Icon,
  title,
  description,
  className,
  children,
  index,
}: {
  icon: typeof Code2;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: EASE_OUT }}
      className={className}
    >
      <TiltCard maxTilt={3} className="flex h-full flex-col overflow-hidden rounded-3xl border border-card-border bg-card-bg/80 p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-card-border bg-background/70">
            <Icon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-foreground/65">{description}</p>
        {children && <div className="mt-6 flex-1">{children}</div>}
      </TiltCard>
    </motion.div>
  );
}

function Terminal() {
  return (
    <div aria-hidden="true" className="rounded-xl border border-card-border bg-background/70 p-4 font-mono text-xs leading-6 md:text-sm">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      {DEPLOYS.map((name, index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.35, duration: 0.4 }}
          className="flex items-center gap-2 text-foreground/70"
        >
          <span className="text-brand-secondary">$</span>
          deploy {name}
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        </motion.div>
      ))}
      <div className="flex items-center gap-2 text-foreground/70">
        <span className="text-brand-secondary">$</span>
        <span className="caret inline-block h-4 w-2 bg-brand-primary" />
      </div>
    </div>
  );
}

function Equalizer() {
  return (
    <div aria-hidden="true" className="flex h-36 items-end gap-1.5">
      {EQ_BARS.map((height, index) => (
        <span
          key={index}
          className="eq-bar flex-1 rounded-md bg-gradient-to-t from-brand-primary to-brand-secondary"
          style={{ height: `${height * 100}%`, animationDelay: `${index * -0.17}s` }}
        />
      ))}
    </div>
  );
}

function Network() {
  const hub = { x: 150, y: 76 };
  return (
    <svg aria-hidden="true" viewBox="0 0 300 150" className="h-auto w-full">
      {NETWORK.map((node) => (
        <line key={`${node.x}-${node.y}`} x1={hub.x} y1={hub.y} x2={node.x} y2={node.y} stroke="#8b5cf6" strokeOpacity="0.6" className="dash-flow" />
      ))}
      {NETWORK.map((node, index) => (
        <circle
          key={`node-${index}`}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="#18181b"
          stroke="#3b82f6"
          strokeWidth="1.5"
          className="node-pulse"
          style={{ animationDelay: `${index * 0.4}s` }}
        />
      ))}
      <circle cx={hub.x} cy={hub.y} r="11" fill="#3b82f6" className="node-pulse" />
    </svg>
  );
}

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(format.format(new Date()));
    const first = setTimeout(update, 0);
    const interval = setInterval(update, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export function BentoGrid() {
  const judged = countRole("Judge");
  const mentored = countRole("Mentor");

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <Card
        index={0}
        className="md:col-span-3"
        icon={Code2}
        title="Full-stack products"
        description="Production web apps built with Next.js and TypeScript, from fintech and property management to immersive creative sites."
      >
        <Terminal />
      </Card>

      <Card
        index={1}
        className="md:col-span-3"
        icon={Mic2}
        title="Technical talks"
        description="Practical sessions on AI agents, Google ADK, modern web development, and developer tools."
      >
        <Equalizer />
      </Card>

      <Card
        index={2}
        className="md:col-span-3 lg:col-span-2"
        icon={Users}
        title="Community building"
        description="Organizing with GDG Cloud Chandigarh, MongoDB User Group Chandigarh, and AI Community Delhi."
      >
        <Network />
      </Card>

      <Card
        index={3}
        className="md:col-span-3 lg:col-span-2"
        icon={Gavel}
        title="Judging and mentoring"
        description="Helping student builders sharpen their ideas at hackathons across India."
      >
        <dl className="grid grid-cols-2 gap-3">
          {[
            { label: "Judged", value: judged },
            { label: "Mentored", value: mentored },
          ].map((item) => (
            <div key={item.label} className="min-w-0 rounded-xl border border-card-border bg-background/70 p-3 sm:p-4">
              <dd className="text-gradient font-mono text-3xl font-bold">{item.value}</dd>
              <dt className="mt-1 text-xs font-medium text-foreground/60">{item.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-foreground/45">Events listed on this site</p>
      </Card>

      <Card
        index={4}
        className="md:col-span-6 lg:col-span-2"
        icon={Globe2}
        title="Available for work"
        description="Open to speaking invitations and freelance full-stack projects."
      >
        <div className="flex h-full flex-col justify-between gap-5">
          <p className="flex items-center gap-2.5 text-sm text-foreground/70">
            <span className="pulse-dot" aria-hidden="true" />
            <LocalTime /> IST, India
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 font-semibold text-brand-primary transition-colors hover:text-brand-secondary"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Card>

      <Card
        index={5}
        className="md:col-span-6"
        icon={Code2}
        title="Technical toolkit"
        description="The languages, frameworks, and tools I reach for most."
      >
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max">
            {[false, true].map((duplicate) => (
              <ul
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
                className={cn("marquee-list flex shrink-0 gap-3 pr-3", duplicate && "marquee-duplicate")}
              >
                {SKILLS.map((skill) => (
                  <li
                    key={skill}
                    className="whitespace-nowrap rounded-full border border-card-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

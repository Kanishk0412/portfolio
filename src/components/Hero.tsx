"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProfileImage } from "@/components/ProfileImage";
import { ConstellationCanvas } from "@/components/motion/ConstellationCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { INSTAGRAM_EVENTS } from "@/data/events";
import { EASE_OUT, fadeUp, staggerChildren } from "@/lib/motion";

const ROLES = ["Developer", "Tech Speaker", "Community Builder"];
const ROLE_INTERVAL_MS = 2600;
const ORBIT_CHIPS = ["Speaker", "Judge", "Mentor"];

// Newest event, with the role suffix trimmed from titles like "Build Arena 2026 — Judge".
const LATEST_EVENT = INSTAGRAM_EVENTS[0];
const LATEST_ROLE = [LATEST_EVENT.role].flat()[0];
const LATEST_NAME = LATEST_EVENT.title.split(" — ")[0];

function Portrait() {
  return (
    <div className="hero-portrait-size relative mx-auto aspect-square w-56 sm:w-64 lg:w-[22rem] 2xl:w-[27rem] isolate">
      {/* Orbit ring */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-[3%] orbit-spin-reverse overflow-visible">
        <defs>
          <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--brand-primary)" }} />
            <stop offset="100%" style={{ stopColor: "var(--brand-secondary)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill="none" stroke="url(#orbit-gradient)" strokeWidth="1" />
        <circle cx="100" cy="2" r="2.5" className="fill-brand-primary" />
      </svg>

      {/* Photo */}
      <div className="absolute inset-[10%] overflow-hidden rounded-full border border-white/10 bg-card-bg shadow-2xl">
        <ProfileImage className="h-full w-full object-cover" />
      </div>

      {/* Chips that travel around the photo while staying upright */}
      <div aria-hidden="true" className="absolute inset-[-3%] orbit-spin-slow">
        {ORBIT_CHIPS.map((chip, index) => (
          <div
            key={chip}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${index * 120}deg) translateY(calc(var(--orbit-radius) * -1))` }}
          >
            <div style={{ transform: `rotate(${index * -120}deg)` }}>
              <span className="orbit-spin-slow-reverse block -translate-x-1/2 -translate-y-1/2 w-max">
                <span className="glass block rounded-full px-3 py-1 text-xs font-semibold text-foreground/90 shadow-lg">
                  {chip}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, ROLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative -mt-24 flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <ConstellationCanvas className="hero-constellation absolute inset-0 h-full w-full" />

      <div className="hero-grid container relative mx-auto grid items-center gap-14 px-6 md:px-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="hero-copy order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          <motion.div variants={staggerChildren} initial="hidden" animate="show" className="contents">
            <motion.p
              variants={fadeUp}
              className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80"
            >
              <span className="pulse-dot" aria-hidden="true" />
              Open to speaking and freelance work
            </motion.p>
          </motion.div>

          <SplitText
            as="h1"
            text="Hi, I'm Kanishk Tyagi"
            highlight={["Kanishk", "Tyagi"]}
            breakAfter="I'm"
            className="mb-6 text-5xl font-bold leading-[1.02] tracking-tight max-[359px]:text-4xl sm:text-7xl xl:text-8xl 2xl:text-9xl"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45 }}
            className="hero-roles mb-10 text-xl text-foreground/70 md:text-2xl"
          >
            <p className="sr-only">{ROLES.join(" | ")}</p>
            <div aria-hidden="true" className="h-8 font-semibold text-brand-primary motion-reduce:hidden md:h-9">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="inline-block"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p aria-hidden="true" className="hidden motion-reduce:block">
              {ROLES.join(" | ")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-actions flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            <Magnetic>
              <Link
                href="/projects"
                className="group flex items-center justify-center rounded-full bg-brand-primary px-8 py-4 font-semibold text-on-brand transition-colors hover:bg-brand-primary/90"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="glass flex items-center justify-center rounded-full px-8 py-4 font-semibold text-foreground transition-colors hover:border-brand-primary/50"
              >
                Invite me to speak
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.7 }}
            className="hero-latest mt-10"
          >
            <Link
              href="/events"
              className="group inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-sm text-foreground/70 transition-colors hover:border-brand-primary/40 hover:text-foreground"
            >
              <span className="shrink-0 rounded-full bg-brand-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-on-brand">
                Latest
              </span>
              <span className="truncate">
                {LATEST_ROLE} · <span className="font-medium text-foreground">{LATEST_NAME}</span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: portraitY, opacity: fade }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="hero-portrait order-1 lg:order-2"
        >
          <Portrait />
        </motion.div>
      </div>

      <div aria-hidden="true" className="scroll-cue absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block" />
    </section>
  );
}

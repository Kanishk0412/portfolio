"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProfileImage } from "@/components/ProfileImage";
import { ConstellationCanvas } from "@/components/motion/ConstellationCanvas";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT, fadeUp, staggerChildren } from "@/lib/motion";

const ROLES = ["Developer", "Tech Speaker", "Community Builder"];
const ROLE_INTERVAL_MS = 2600;
const ORBIT_CHIPS = ["Speaker", "Judge", "Mentor"];

function Portrait() {
  return (
    <div className="hero-portrait-size relative mx-auto aspect-square w-56 sm:w-64 lg:w-[22rem] 2xl:w-[27rem] isolate">
      <div className="hero-glow absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.32),rgba(139,92,246,0.18)_45%,transparent_70%)]" />

      {/* Orbit rings */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-[-8%] orbit-spin overflow-visible">
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(250,250,250,0.1)" strokeWidth="0.5" strokeDasharray="2 5" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-[3%] orbit-spin-reverse overflow-visible">
        <defs>
          <linearGradient id="orbit-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill="none" stroke="url(#orbit-gradient)" strokeWidth="1" />
        <circle cx="100" cy="2" r="2.5" fill="#3b82f6" />
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
            className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight max-[359px]:text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl"
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
                className="group flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-white/90"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="glass flex items-center justify-center rounded-full px-8 py-4 font-semibold text-white transition-colors hover:border-brand-primary/50"
              >
                Invite me to speak
              </Link>
            </Magnetic>
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

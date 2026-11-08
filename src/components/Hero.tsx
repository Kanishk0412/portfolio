"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProfileImage } from "@/components/ProfileImage";
import { EASE_OUT, fadeUp, staggerChildren } from "@/lib/motion";

const ROLES = ["Developer", "Tech Speaker", "Community Builder"];
const ROLE_INTERVAL_MS = 2600;

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, ROLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className="container mx-auto px-6 md:px-12 pt-12 md:pt-24 flex flex-col items-center text-center"
    >
      <motion.div variants={fadeUp} className="mb-8 relative inline-block isolate">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card-border overflow-hidden bg-card-bg relative z-10 shadow-2xl">
          <ProfileImage className="w-full h-full object-cover" />
        </div>
        <div className="hero-glow absolute -inset-4 bg-gradient-to-r from-brand-primary/30 to-brand-secondary/30 blur-2xl -z-10 rounded-full" />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
      >
        Hi, I&apos;m Kanishk Tyagi
      </motion.h1>

      <motion.div variants={fadeUp} className="mb-10 text-xl md:text-2xl text-foreground/70">
        <p className="sr-only">{ROLES.join(" | ")}</p>
        <div aria-hidden="true" className="h-8 md:h-9 font-semibold text-brand-primary motion-reduce:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={ROLES[roleIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
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

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link
          href="/projects"
          className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full font-semibold transition-colors flex items-center justify-center group"
        >
          View Projects
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/contact"
          className="px-8 py-4 bg-card-bg border border-card-border hover:bg-card-bg/80 hover:border-brand-primary/50 text-white rounded-full font-semibold transition-colors flex items-center justify-center"
        >
          Invite me to speak
        </Link>
      </motion.div>
    </motion.section>
  );
}

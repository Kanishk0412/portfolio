"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { EASE_OUT, fadeUp, staggerChildren } from "@/lib/motion";
import { STAGE_PHOTOS } from "./aboutData";

/** Profile photo with two event photos tucked behind it that fan out on hover. */
function PhotoStack() {
  const [left, right] = STAGE_PHOTOS;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="group relative mx-auto aspect-[4/5] w-64 sm:w-72 lg:w-80"
    >
      {[left, right].map((photo, index) =>
        photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.title}
            className={
              "absolute inset-0 h-full w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black/60 transition-transform duration-500 ease-out " +
              (index === 0
                ? "-rotate-6 group-hover:-translate-x-[38%] group-hover:-rotate-[14deg]"
                : "rotate-6 group-hover:translate-x-[38%] group-hover:rotate-[14deg]")
            }
          />
        ) : null
      )}
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/15 bg-card-bg shadow-2xl shadow-black/60 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/profile.jpg" alt="Kanishk Tyagi" fetchPriority="high" className="h-full w-full object-cover" />
        <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 [@media(hover:none)]:hidden">
          Hover to see me on stage
        </span>
      </div>
    </motion.div>
  );
}

export function AboutIntro() {
  return (
    <section className="grid items-center gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
      <div className="text-center lg:text-left">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-primary"
        >
          About me
        </motion.p>
        <SplitText
          as="h1"
          text="I build products, talk tech, and grow communities."
          highlight={["talk", "tech,"]}
          className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
        />
        <motion.div variants={staggerChildren} initial="hidden" animate="show" className="mt-8 flex flex-col items-center gap-6 lg:items-start">
          <motion.p variants={fadeUp} className="max-w-xl text-lg text-foreground/70">
            Full-stack developer, tech speaker, and community builder. Sr. CSA at Prodege, and a UIET, Panjab University
            graduate.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/70 lg:justify-start">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              India · <LocalTime className="font-mono text-foreground" />
            </span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="pulse-dot" aria-hidden="true" />
              Open to talks and freelance work
            </span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link
                href="/contact"
                className="group flex items-center justify-center rounded-full bg-brand-primary px-7 py-3.5 font-semibold text-on-brand transition-colors hover:bg-brand-primary/90"
              >
                Work with me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/events"
                className="glass flex items-center justify-center rounded-full px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-brand-primary/50"
              >
                See me on stage
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
      <PhotoStack />
    </section>
  );
}

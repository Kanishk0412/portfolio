"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { INTRO_SEEN_KEY } from "@/lib/intro";
import { EASE_OUT } from "@/lib/motion";

/** A short counter and curtain shown on the first visit of a session. */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Already hidden by CSS before paint; nothing to run.
    if (document.documentElement.dataset.introSeen) return;
    document.documentElement.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(value)).padStart(3, "0");
      },
      onComplete: () => {
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {}
        setTimeout(() => setDone(true), 200);
      },
    });
    return () => {
      controls.stop();
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="intro-loader fixed inset-0 z-[90] flex flex-col justify-between bg-background p-6 md:p-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/50"
          >
            Developer · Speaker · Community
          </motion.p>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-40%", opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="font-display text-[15vw] font-bold leading-[0.9] tracking-tighter md:text-[11vw]"
            >
              Kanishk<span className="text-brand-primary">.</span>
            </motion.p>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-px w-1/2 overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="h-full origin-left bg-brand-primary"
              />
            </div>
            <span ref={countRef} className="font-display text-5xl font-bold tabular-nums text-brand-primary md:text-7xl">
              000
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

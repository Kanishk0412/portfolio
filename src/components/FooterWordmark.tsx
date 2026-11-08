"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Oversized name that rises into place as the visitor reaches the end of the page. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden select-none">
      <motion.p
        style={{ y }}
        className="footer-wordmark text-center text-[19vw] font-bold leading-[0.85] tracking-tighter"
      >
        KANISHK
      </motion.p>
    </div>
  );
}

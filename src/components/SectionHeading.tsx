"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  as = "h2",
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Use "h1" when this is the main heading of the page. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-12 md:mb-16 text-center md:text-left">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.base, ease: EASE_OUT }}
          className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-primary"
        >
          {eyebrow}
        </motion.p>
      )}
      <SplitText as={as} text={title} className="text-3xl md:text-5xl font-bold tracking-tight mb-4" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION.base, delay: 0.2, ease: EASE_OUT }}
          className="text-foreground/70 max-w-2xl text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        className="h-0.5 w-20 bg-gradient-to-r from-brand-primary to-brand-secondary mt-6 mx-auto md:mx-0 origin-left rounded-full"
      />
    </div>
  );
}

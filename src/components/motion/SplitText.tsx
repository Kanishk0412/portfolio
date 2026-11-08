"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

/**
 * Reveals text word by word from behind a mask. Screen readers get the whole
 * sentence through aria-label rather than one word at a time.
 */
export function SplitText({
  text,
  as = "h2",
  className,
  highlight = [],
  breakAfter,
}: {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  /** Words to render with the brand gradient. */
  highlight?: string[];
  /** Word to start a new line after. */
  breakAfter?: string;
}) {
  const Tag = TAGS[as];

  return (
    <Tag
      aria-label={text}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {text.split(" ").map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          {/* Padding keeps descenders from being clipped by the mask. */}
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
          >
            <motion.span
              variants={word}
              className={cn("inline-block", highlight.includes(item) && "text-gradient")}
            >
              {item}
            </motion.span>
          </span>{" "}
          {item === breakAfter && <br />}
        </Fragment>
      ))}
    </Tag>
  );
}

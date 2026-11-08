"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

// The first page load is left static so it isn't hidden until hydration.
let hasMounted = false;

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={hasMounted ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

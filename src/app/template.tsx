"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { usePageTransition } from "@/components/providers/PageTransition";
import { EASE_EMPHASIS } from "@/lib/motion";

// Module scope survives client-side navigations but resets on a full load,
// so the first paint is never hidden behind an animation.
let hasNavigated = false;

const pageEntrance: Variants = {
  // Hidden only ever happens under the curtain, so it can be instant.
  hidden: { opacity: 0, y: 18, transition: { duration: 0 } },
  // Rises as the curtain's trailing edge passes, rather than after it.
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EMPHASIS, delay: 0.3 } },
};

/**
 * Holds the page out of sight while the curtain covers the screen, then lets
 * it settle in as the curtain lifts. Without a curtain (back/forward), it
 * plays the same entrance on its own.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const { isCovered } = usePageTransition();
  const [isFirstPaint] = useState(() => !hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      variants={pageEntrance}
      initial={isFirstPaint ? false : "hidden"}
      animate={isCovered ? "hidden" : "visible"}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_EMPHASIS } from "@/lib/motion";

// Module scope survives client-side navigations but resets on a full load,
// so the first paint is never hidden behind an animation.
let hasNavigated = false;

/** Re-mounts on every navigation: a curtain lifts while the new page settles in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [shouldAnimate] = useState(() => hasNavigated);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!shouldAnimate) return <>{children}</>;

  return (
    <>
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 origin-top bg-surface"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE_EMPHASIS }}
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE_EMPHASIS, delay: reduceMotion ? 0 : 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}

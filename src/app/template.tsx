"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePageTransition } from "@/components/providers/PageTransition";
import { pageMotion } from "@/lib/motion";

// Module scope survives client-side navigations but resets on a full load,
// so the first paint is never hidden behind an animation.
let hasNavigated = false;

/**
 * The page's own motion. It lifts away while a page change is underway, and
 * every new page fades up into place, including back/forward. On a first
 * load it stays out of sight under the entrance curtain and rises as the
 * curtain exits.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { curtain, leavingFrom } = usePageTransition();

  useEffect(() => {
    hasNavigated = true;
  }, []);

  const state =
    curtain === "covered" ? "hidden" : curtain === "revealing" ? "revealed" : leavingFrom === pathname ? "leaving" : "visible";

  return (
    // Keyed by path so every page, even one sharing this template, enters fresh.
    <motion.div key={pathname} variants={pageMotion} initial={hasNavigated ? "hidden" : false} animate={state}>
      {children}
    </motion.div>
  );
}

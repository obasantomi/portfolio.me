"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

const smoothScrollOptions: LenisOptions = {
  autoRaf: true,
  anchors: true,
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  stopInertiaOnNavigate: true,
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={smoothScrollOptions}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}

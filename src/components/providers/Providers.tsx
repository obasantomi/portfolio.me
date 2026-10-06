"use client";

import { MotionConfig } from "framer-motion";
import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { AudioProvider } from "./AudioProvider";
import { ScrollFeel } from "./ScrollFeel";

const smoothScrollOptions: LenisOptions = {
  autoRaf: true,
  anchors: true,
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  stopInertiaOnNavigate: true,
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <AudioProvider>
        <ReactLenis root options={smoothScrollOptions}>
          <ScrollFeel />
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </ReactLenis>
      </AudioProvider>
    </ThemeProvider>
  );
}

"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { useAudio } from "./AudioProvider";

// Lower lerp means the page trails the wheel for longer, so scrolling glides.
const CALM = { lerp: 0.075, wheelMultiplier: 0.85 };
const WITH_MUSIC = { lerp: 0.05, wheelMultiplier: 0.7 };
const BLEND_MS = 1400;

/**
 * Softens scrolling while the background music plays. The change blends in
 * over a beat or two instead of snapping, so it feels like part of the track.
 * Lenis already disables smoothing for visitors who prefer reduced motion.
 */
export function ScrollFeel() {
  const lenis = useLenis();
  const { isMusicPlaying } = useAudio();

  useEffect(() => {
    if (!lenis) return;

    const from = { lerp: lenis.options.lerp, wheelMultiplier: lenis.options.wheelMultiplier };
    const to = isMusicPlaying ? WITH_MUSIC : CALM;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - start) / BLEND_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      lenis.options.lerp = from.lerp + (to.lerp - from.lerp) * eased;
      lenis.options.wheelMultiplier = from.wheelMultiplier + (to.wheelMultiplier - from.wheelMultiplier) * eased;
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [lenis, isMusicPlaying]);

  return null;
}

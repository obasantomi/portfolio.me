import type { Transition, Variants } from "framer-motion";

/*
 * Motion identity: calm and precise. One signature curve for most tweens,
 * springs for anything the visitor touches or that moves through space.
 */
export const EASE_OUT = [0.2, 0, 0, 1] as const;
export const EASE_EMPHASIS = [0.05, 0.7, 0.1, 1] as const;

export const SPRING_MICRO: Transition = { type: "spring", stiffness: 420, damping: 32 };
export const SPRING_ENTRANCE: Transition = { type: "spring", stiffness: 180, damping: 26 };
export const SPRING_FOLLOW: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.6 };

export const heroSequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_EMPHASIS },
  },
};

/** Wipes media in from the bottom edge as it scrolls into view. */
export const mediaReveal: Variants = {
  hidden: { clipPath: "inset(14% 0% 0% 0% round 16px)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 0.9, ease: EASE_EMPHASIS },
  },
};

export const mediaSettle: Variants = {
  hidden: { scale: 1.08 },
  visible: { scale: 1, transition: { duration: 1.2, ease: EASE_EMPHASIS } },
};

export const inViewOnce = { once: true, amount: 0.25 } as const;

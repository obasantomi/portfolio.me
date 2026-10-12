import type { Transition, Variants } from "framer-motion";

/*
 * Motion identity: calm and precise. One signature curve for most tweens,
 * springs for anything the visitor touches or that moves through space.
 */
export const EASE_OUT = [0.2, 0, 0, 1] as const;
export const EASE_EMPHASIS = [0.05, 0.7, 0.1, 1] as const;
/** For surfaces that travel the full viewport: eases in and out, so it never snaps at either edge. */
export const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const;
/** For things leaving: starts gently and accelerates away, so the exit never lingers. */
export const EASE_IN = [0.4, 0, 1, 1] as const;

/** Seconds the current page takes to step away before the next route is pushed. */
export const PAGE_EXIT = 0.28;

/*
 * Page-to-page motion. The current page lifts away quickly and quietly; the
 * next one fades up into place. Opacity and a short travel only: blurring a
 * whole page is expensive, and the header stays put to carry continuity.
 */
export const pageMotion: Variants = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_EMPHASIS, delay: 0.06 } },
  leaving: { opacity: 0, y: -10, transition: { duration: PAGE_EXIT, ease: EASE_IN } },
  // First-load entrance: rises as the curtain's trailing edge passes.
  revealed: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EMPHASIS, delay: 0.3 } },
};

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

/**
 * Media opens upward from its bottom edge, like the page curtain lifting.
 * It starts partly open so the reveal is felt rather than staged.
 */
export const mediaReveal: Variants = {
  hidden: { clipPath: "inset(40% 0% 0% 0% round 16px)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 1.1, ease: EASE_CURTAIN },
  },
};

/** The picture eases back from a light crop on the wipe's curve, settling just after it opens. */
export const mediaSettle: Variants = {
  hidden: { scale: 1.12 },
  visible: { scale: 1, transition: { duration: 1.6, ease: EASE_CURTAIN } },
};

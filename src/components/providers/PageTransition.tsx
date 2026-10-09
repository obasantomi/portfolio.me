"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { EASE_CURTAIN, EASE_EMPHASIS, EASE_OUT } from "@/lib/motion";

type Phase = "idle" | "covering" | "covered" | "revealing";

const PageTransitionContext = createContext<{ isCovered: boolean }>({ isCovered: false });

export const usePageTransition = () => useContext(PageTransitionContext);

/** Only movement between home, the work index, and case studies gets the curtain. */
const isTransitionRoute = (path: string) => path === "/" || path === "/work" || path.startsWith("/work/");

// If a navigation never commits (offline, server error), fall back to a full load.
const NAVIGATION_TIMEOUT_MS = 10_000;

/** Seconds. Tuned to feel unhurried: the sheet is meant to be watched, not glimpsed. */
const TIMING = {
  coverDelay: 0.12,
  coverIn: 1.1,
  markDelay: 0.12,
  ringDraw: 1.05,
  letters: 0.7,
  orbit: 0.8,
  hold: 0.95,
  markOut: 0.35,
  coverOut: 1,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

/** Finds a same-tab, same-origin link click that moves to a different transition route. */
function transitionTargetFor(event: MouseEvent): URL | null {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return null;
  if (!isTransitionRoute(window.location.pathname) || !isTransitionRoute(url.pathname)) return null;

  return url;
}

/**
 * Page-to-page curtain. A solid sheet slides down over the viewport, the
 * monogram settles in its centre, the next route commits behind it, and the
 * sheet carries on downward to reveal the new page.
 *
 * Links are taken over in the capture phase, so every next/link in the app
 * gets the curtain without opting in: next/link skips its own navigation when
 * the click is already default-prevented. Back/forward is left to the browser
 * and gets the template's soft entrance instead, so history stays instant.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [phase, setPhase] = useState<Phase>("idle");

  const isRunning = useRef(false);
  const pendingCommit = useRef<{ pathname: string; resolve: () => void } | null>(null);

  // Resolves once the target route has rendered behind the curtain.
  useEffect(() => {
    if (pendingCommit.current?.pathname !== pathname) return;
    pendingCommit.current.resolve();
    pendingCommit.current = null;
  }, [pathname]);

  const run = useCallback(
    async (url: URL) => {
      isRunning.current = true;
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      lenis?.stop();
      setPhase("covering");

      const sheet = scope.current;
      const mark = sheet.querySelector<HTMLElement>("[data-curtain-mark]")!;
      const ring = mark.querySelector<SVGCircleElement>("[data-ring]")!;
      const letters = mark.querySelector<HTMLElement>("[data-letters]")!;
      const orbit = mark.querySelector<HTMLElement>("[data-orbit]")!;

      // Reset the mark so every run starts from a blank sheet.
      animate(mark, { opacity: 1 }, { duration: 0 });
      animate(ring, { strokeDashoffset: 1 }, { duration: 0 });
      animate(letters, { opacity: 0, y: 6, filter: "blur(4px)" }, { duration: 0 });
      animate(orbit, { opacity: 0, rotate: -120 }, { duration: 0 });

      // 1. A blank sheet slides down and covers the viewport.
      await animate(sheet, { y: ["-100%", "0%"] }, { duration: TIMING.coverIn, ease: EASE_CURTAIN, delay: TIMING.coverDelay });
      setPhase("covered");

      // The next route loads behind the sheet while the mark draws.
      const committed = new Promise<void>((resolve) => {
        pendingCommit.current = { pathname: url.pathname, resolve };
      });
      const fallback = window.setTimeout(() => window.location.assign(href), NAVIGATION_TIMEOUT_MS);
      router.push(href);

      // 2. Once covered, the ring traces a full turn from twelve o'clock, the
      //    initials surface as it closes, and the accent arc sweeps once into place.
      const ringDrawn = animate(
        ring,
        { strokeDashoffset: [1, 0] },
        { duration: TIMING.ringDraw, ease: EASE_CURTAIN, delay: TIMING.markDelay },
      );
      const lettersIn = animate(
        letters,
        { opacity: [0, 1], y: [6, 0], filter: ["blur(4px)", "blur(0px)"] },
        { duration: TIMING.letters, ease: EASE_EMPHASIS, delay: TIMING.markDelay + TIMING.ringDraw * 0.45 },
      );
      await Promise.all([ringDrawn, lettersIn]);
      // A single sweep that comes to rest, never a loop.
      animate(orbit, { opacity: [0, 1], rotate: [-120, 0] }, { duration: TIMING.orbit, ease: EASE_EMPHASIS });

      await Promise.all([committed, sleep(TIMING.hold * 1000)]);
      window.clearTimeout(fallback);
      // Let the new page paint once before anything moves off it.
      await nextFrame();

      // 3. The mark dissolves in place, then the sheet carries on downward.
      setPhase("revealing");
      animate(mark, { opacity: 0, filter: ["blur(0px)", "blur(4px)"] }, { duration: TIMING.markOut, ease: EASE_OUT });
      await animate(sheet, { y: "100%" }, { duration: TIMING.coverOut, ease: EASE_CURTAIN, delay: TIMING.markOut * 0.6 });

      animate(sheet, { y: "-100%" }, { duration: 0 });
      animate(mark, { filter: "blur(0px)" }, { duration: 0 });
      lenis?.start();
      setPhase("idle");
      isRunning.current = false;
    },
    [animate, lenis, router, scope],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const handleClick = (event: MouseEvent) => {
      const url = transitionTargetFor(event);
      if (!url) return;
      event.preventDefault();
      if (!isRunning.current) void run(url);
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [reduceMotion, run]);

  return (
    <PageTransitionContext.Provider value={{ isCovered: phase === "covered" }}>
      {children}
      <div
        ref={scope}
        aria-hidden
        className="page-curtain fixed inset-0 z-90 grid place-items-center"
        style={{
          // Parked above the viewport; Framer owns transform from the first run onward.
          transform: "translateY(-100%)",
          pointerEvents: phase === "idle" ? "none" : "auto",
          visibility: phase === "idle" ? "hidden" : "visible",
        }}
      >
        <div data-curtain-mark className="on-curtain page-curtain-mark relative grid size-[4.5rem] place-items-center">
          <svg viewBox="0 0 72 72" className="absolute inset-0 size-full -rotate-90 overflow-visible">
            <circle
              data-ring
              cx="36"
              cy="36"
              r="35.25"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset="1"
            />
          </svg>
          <span data-orbit className="monogram-orbit absolute inset-0 rounded-full opacity-0" />
          <span data-letters className="font-display text-[26px] leading-none font-bold tracking-[-0.06em] text-fg opacity-0">
            TO
          </span>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { INTRO_CLASS } from "@/lib/intro";
import { EASE_CURTAIN, EASE_EMPHASIS, EASE_OUT, PAGE_EXIT } from "@/lib/motion";

/** Where the entrance curtain is; it only ever plays on a first load. */
type CurtainPhase = "idle" | "covered" | "revealing";

type PageTransitionState = {
  curtain: CurtainPhase;
  /** The pathname currently stepping away during a page change, if any. */
  leavingFrom: string | null;
};

const PageTransitionContext = createContext<PageTransitionState>({ curtain: "idle", leavingFrom: null });

export const usePageTransition = () => useContext(PageTransitionContext);

/** Only movement between home, the work index, and case studies is taken over. */
const isTransitionRoute = (path: string) => path === "/" || path === "/work" || path.startsWith("/work/");

// If a navigation never commits (offline, server error), fall back to a full load.
const NAVIGATION_TIMEOUT_MS = 10_000;

/** Seconds. Tuned to feel unhurried: the entrance is meant to be watched, not glimpsed. */
const ENTRANCE = {
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
 * Two kinds of motion between pages, sized to how often each is seen.
 *
 * Entrance, once per session: a solid sheet already covers the screen at the
 * first paint, the monogram draws itself, and the sheet exits downward to
 * reveal the page.
 *
 * Page changes, every time: the current page lifts away in under a third of a
 * second, the next route commits, and it fades up into place. No sheet, no
 * logo, so moving around the site never keeps anyone waiting. Links are taken
 * over in the capture phase; next/link stands down when a click is already
 * default-prevented. Back/forward gets the template's entrance on its own.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [curtain, setCurtain] = useState<CurtainPhase>("idle");
  const [leavingFrom, setLeavingFrom] = useState<string | null>(null);

  const isRunning = useRef(false);
  const pendingCommit = useRef<{ pathname: string; resolve: () => void } | null>(null);

  // Resolves once the target route has rendered.
  useEffect(() => {
    if (pendingCommit.current?.pathname !== pathname) return;
    pendingCommit.current.resolve();
    pendingCommit.current = null;
  }, [pathname]);

  const navigate = useCallback(
    async (url: URL) => {
      isRunning.current = true;
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      lenis?.stop();

      // 1. The current page steps away.
      setLeavingFrom(window.location.pathname);
      await sleep(PAGE_EXIT * 1000);

      // 2. The next route commits while nothing is on screen to jump.
      const committed = new Promise<void>((resolve) => {
        pendingCommit.current = { pathname: url.pathname, resolve };
      });
      const fallback = window.setTimeout(() => window.location.assign(href), NAVIGATION_TIMEOUT_MS);
      router.push(href);
      await committed;
      window.clearTimeout(fallback);

      // 3. The template fades the new page up; scrolling comes back with it.
      setLeavingFrom(null);
      lenis?.start();
      isRunning.current = false;
    },
    [lenis, router],
  );

  const playEntrance = useCallback(async () => {
    isRunning.current = true;
    lenis?.stop();
    setCurtain("covered");

    const root = document.documentElement;
    const sheet = scope.current;
    const mark = sheet.querySelector<HTMLElement>("[data-curtain-mark]")!;
    const ring = mark.querySelector<SVGCircleElement>("[data-ring]")!;
    const letters = mark.querySelector<HTMLElement>("[data-letters]")!;
    const orbit = mark.querySelector<HTMLElement>("[data-orbit]")!;

    // Take the sheet over from the CSS that has held it in place since the
    // first paint, once React has committed it as covering.
    animate(sheet, { y: "0%" }, { duration: 0 });
    animate(orbit, { opacity: 0, rotate: -120 }, { duration: 0 });
    await nextFrame();
    root.classList.remove(INTRO_CLASS);

    // 1. The ring traces a full turn from twelve o'clock, the initials surface
    //    as it closes, and the accent arc sweeps once into place.
    const ringDrawn = animate(
      ring,
      { strokeDashoffset: [1, 0] },
      { duration: ENTRANCE.ringDraw, ease: EASE_CURTAIN, delay: ENTRANCE.markDelay },
    );
    const lettersIn = animate(
      letters,
      { opacity: [0, 1], y: [6, 0], filter: ["blur(4px)", "blur(0px)"] },
      { duration: ENTRANCE.letters, ease: EASE_EMPHASIS, delay: ENTRANCE.markDelay + ENTRANCE.ringDraw * 0.45 },
    );
    await Promise.all([ringDrawn, lettersIn]);
    // A single sweep that comes to rest, never a loop.
    animate(orbit, { opacity: [0, 1], rotate: [-120, 0] }, { duration: ENTRANCE.orbit, ease: EASE_EMPHASIS });
    await sleep(ENTRANCE.hold * 1000);

    // 2. The mark dissolves in place, then the sheet exits downward.
    setCurtain("revealing");
    animate(mark, { opacity: 0, filter: ["blur(0px)", "blur(4px)"] }, { duration: ENTRANCE.markOut, ease: EASE_OUT });
    await animate(sheet, { y: "100%" }, { duration: ENTRANCE.coverOut, ease: EASE_CURTAIN, delay: ENTRANCE.markOut * 0.6 });

    lenis?.start();
    setCurtain("idle");
    isRunning.current = false;
  }, [animate, lenis, scope]);

  // The inline script in the root layout marks a first visit before the first
  // paint. Waits for Lenis so scrolling is frozen throughout.
  useEffect(() => {
    if (!lenis || isRunning.current || !document.documentElement.classList.contains(INTRO_CLASS)) return;
    const frame = requestAnimationFrame(() => void playEntrance());
    return () => cancelAnimationFrame(frame);
  }, [lenis, playEntrance]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleClick = (event: MouseEvent) => {
      const url = transitionTargetFor(event);
      if (!url) return;
      event.preventDefault();
      if (!isRunning.current) void navigate(url);
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [reduceMotion, navigate]);

  return (
    <PageTransitionContext.Provider value={{ curtain, leavingFrom }}>
      {children}
      <div
        ref={scope}
        aria-hidden
        className="page-curtain fixed inset-0 z-90 grid place-items-center"
        style={{
          // Parked above the viewport; the entrance CSS and then Framer own it while it plays.
          transform: "translateY(-100%)",
          pointerEvents: curtain === "idle" ? "none" : "auto",
          visibility: curtain === "idle" ? "hidden" : "visible",
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

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useCallback, useSyncExternalStore } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { EASE_OUT } from "@/lib/motion";
import { useAudio } from "@/components/providers/AudioProvider";

const subscribeNoop = () => () => {};

// The theme is only known on the client, so render a neutral icon until mounted.
function useHasMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const isDark = !mounted || resolvedTheme === "dark";
  const { playThemeSound } = useAudio();

  /*
   * The new theme is revealed as a circle growing out of the bottom-left
   * corner (keyframes in globals.css). Inside the View Transition callback we
   * only swap the theme class, which is instant, so the animation starts on
   * the click. next-themes then records the choice once the reveal is running.
   */
  const switchTheme = useCallback(() => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    const applyClass = () => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
    };

    playThemeSound(next);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof document.startViewTransition !== "function") {
      applyClass();
      setTheme(next);
      return;
    }

    root.dataset.themeTransition = "";
    const transition = document.startViewTransition(applyClass);
    transition.updateCallbackDone.then(() => setTheme(next));
    transition.finished.finally(() => {
      delete root.dataset.themeTransition;
    });
  }, [isDark, playThemeSound, setTheme]);

  return (
    <button
      type="button"
      data-tap-sound="off"
      onClick={switchTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg active:scale-95"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="grid place-items-center"
        >
          {isDark ? <HiMoon className="size-4.5" /> : <HiSun className="size-4.5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

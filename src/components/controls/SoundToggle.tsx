"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiMusicalNote } from "react-icons/hi2";
import { useAudio } from "@/components/providers/AudioProvider";
import { EASE_OUT } from "@/lib/motion";

const BAR_HEIGHTS = [0.45, 0.9, 0.6, 0.8];

/** A note invites visitors to play music; equaliser bars show it is playing. */
export function SoundToggle() {
  const { isMusicPlaying, toggleMusic } = useAudio();
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
      aria-pressed={isMusicPlaying}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg active:scale-95 aria-pressed:text-accent"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isMusicPlaying ? (
          <motion.span
            key="bars"
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="flex h-3.5 items-end gap-[3px]"
          >
            {BAR_HEIGHTS.map((height, index) => (
              <motion.span
                key={index}
                className="h-full w-[2.5px] origin-bottom rounded-full bg-current"
                initial={{ scaleY: height }}
                animate={reduceMotion ? { scaleY: height } : { scaleY: [height, 0.25, 1, height * 0.6, height] }}
                transition={reduceMotion ? { duration: 0 } : { duration: 1.1 + index * 0.17, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="note"
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="grid place-items-center"
          >
            <HiMusicalNote className="size-4.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

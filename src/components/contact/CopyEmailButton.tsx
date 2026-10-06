"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiCheck, HiOutlineEnvelope, HiOutlineSquare2Stack } from "react-icons/hi2";
import { profile } from "@/data/profile";
import { EASE_OUT } from "@/lib/motion";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Copy failed",
};

/** The email address as a primary row: click to compose, or copy it in one tap. */
export function CopyEmailButton() {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
      <a
        href={`mailto:${profile.email}`}
        className="group inline-flex min-w-0 items-center gap-3 font-display text-[clamp(1.35rem,3.6vw,2.5rem)] tracking-[-0.02em] break-all underline decoration-line decoration-2 underline-offset-[10px] transition-colors hover:decoration-accent"
      >
        <HiOutlineEnvelope aria-hidden className="size-[0.8em] shrink-0 text-muted transition-colors group-hover:text-accent" />
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={state === "idle" ? "Copy email address" : labels[state]}
        className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-fg transition-colors duration-150 hover:border-fg active:scale-[0.97]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={state}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="inline-flex items-center gap-2"
          >
            {state === "copied" ? (
              <HiCheck className="size-4" aria-hidden />
            ) : (
              <HiOutlineSquare2Stack className="size-4" aria-hidden />
            )}
            <span aria-live="polite">{labels[state]}</span>
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

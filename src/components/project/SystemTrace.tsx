"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";
import { cx } from "@/components/ui/primitives";
import { EASE_OUT, SPRING_ENTRANCE } from "@/lib/motion";

interface TraceStep {
  name: string;
  detail: string;
  logs: string[];
}

const steps: TraceStep[] = [
  {
    name: "WhatsApp webhook",
    detail: "A renter sends a message",
    logs: ["webhook  message received from +234 ••• ••••"],
  },
  {
    name: "Redis buffer",
    detail: "Rapid-fire messages merge into one turn",
    logs: ["buffer   3 messages debounced into 1"],
  },
  {
    name: "BullMQ queue",
    detail: "The API hands off the job and stays fast",
    logs: ["queue    job added: sage-reply"],
  },
  {
    name: "Worker",
    detail: "Loads the user's context and recent history",
    logs: ["worker   context loaded"],
  },
  {
    name: "Gemini",
    detail: "Transient failures retry with jittered backoff",
    logs: ["gemini   429, retrying with backoff", "gemini   200 OK"],
  },
  {
    name: "WhatsApp reply",
    detail: "A personalised answer goes back",
    logs: ["reply    sent"],
  },
];

const STEP_MS = 1500;
const HOLD_MS = 2800;
const VISIBLE_LOG_LINES = 4;
const lastStep = steps.length - 1;

/**
 * The hero's one orchestrated moment: a simplified, looping trace of the SageAI
 * message pipeline. It pauses off-screen, on request, and for reduced motion.
 */
export function SystemTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const isStatic = Boolean(reduceMotion);
  const isRunning = isInView && !isPaused && !isStatic;
  const shownStep = isStatic ? lastStep : activeStep;

  useEffect(() => {
    if (!isRunning) return;
    const delay = activeStep === lastStep ? HOLD_MS : STEP_MS;
    const timer = window.setTimeout(() => {
      setActiveStep((step) => (step === lastStep ? 0 : step + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeStep, isRunning]);

  const logLines = steps
    .slice(0, shownStep + 1)
    .flatMap((step, stepIndex) => step.logs.map((line, lineIndex) => ({ line, key: `${stepIndex}-${lineIndex}` })))
    .slice(-VISIBLE_LOG_LINES);

  return (
    <div ref={containerRef} className="border-t border-line">
      <div className="flex items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          <p className="text-sm font-medium text-fg">SageAI message pipeline</p>
        </div>
        {!isStatic ? (
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? "Play pipeline animation" : "Pause pipeline animation"}
            className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            {isPaused ? <HiPlay className="size-3.5" /> : <HiPause className="size-3.5" />}
          </button>
        ) : null}
      </div>

      <ol className="relative pt-2 pb-2" aria-label="Pipeline steps">
        {steps.map((step, index) => {
          const isReached = index <= shownStep;
          const isCurrent = index === shownStep;
          const isLast = index === lastStep;

          return (
            <li key={step.name} className="relative flex gap-4 pb-4">
              {!isLast ? (
                <span aria-hidden className="absolute top-6 bottom-0 left-[9px] w-px bg-line">
                  <motion.span
                    className="absolute inset-0 origin-top bg-accent"
                    initial={false}
                    animate={{ scaleY: index < shownStep ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  />
                </span>
              ) : null}

              <span aria-hidden className="relative mt-1 grid size-[19px] shrink-0 place-items-center">
                <span
                  className={cx(
                    "size-[19px] rounded-full border transition-colors duration-300",
                    isReached ? "border-accent bg-accent-soft" : "border-line bg-surface",
                  )}
                />
                <motion.span
                  className="absolute size-[7px] rounded-full bg-accent"
                  initial={false}
                  animate={{ scale: isReached ? 1 : 0, opacity: isReached ? 1 : 0 }}
                  transition={SPRING_ENTRANCE}
                />
              </span>

              <div className="min-w-0">
                <p
                  className={cx(
                    "text-sm font-medium transition-colors duration-300",
                    isReached ? "text-fg" : "text-muted",
                  )}
                >
                  {step.name}
                </p>
                <p className="text-[13px] leading-snug text-muted">{step.detail}</p>
              </div>

              {isCurrent && !isStatic ? <span className="sr-only">Current step</span> : null}
            </li>
          );
        })}
      </ol>

      <div className="rounded-xl bg-surface-2 px-4 py-3 font-mono text-[12px] leading-6" aria-hidden>
        <div className="flex h-24 flex-col justify-end overflow-hidden">
          <AnimatePresence initial={false}>
            {logLines.map(({ line, key }, index) => (
              <motion.p
                key={key}
                layout="position"
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{
                  opacity: index === logLines.length - 1 ? 1 : 0.55,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="truncate whitespace-pre text-fg"
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

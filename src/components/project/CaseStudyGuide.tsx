"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

export interface GuideSection {
  id: string;
  label: string;
}

const ROW = 40; // collapsed title row height; the odometer moves one row per section
const ITEM = 30; // expanded list row height
const COLLAPSED_WIDTH = 300;
const EXPANDED_WIDTH = 440;
const SCROLL_OFFSET = -110; // keep headings clear of the fixed header

/**
 * Finds the section being read. A heading counts once it passes 100px from the
 * top and before it reaches the top third, so the label changes as you start
 * a section rather than when its heading leaves the screen.
 */
function useActiveSection(sections: GuideSection[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
          else visible.delete(entry.target);
        }

        let current = null as HTMLElement | null;
        let best = 0;
        let bestTop = Infinity;
        visible.forEach((ratio, element) => {
          const top = element.getBoundingClientRect().top;
          if (ratio > best || (ratio === best && top < bestTop)) {
            best = ratio;
            bestTop = top;
            current = element as HTMLElement;
          }
        });

        // Between headings: the last one above the fold is still being read.
        if (!current) {
          for (let i = elements.length - 1; i >= 0; i--) {
            if (elements[i].getBoundingClientRect().top < 100) {
              current = elements[i];
              break;
            }
          }
        }

        if (current) {
          const index = elements.indexOf(current);
          if (index !== -1) setActive(index);
        }
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return active;
}

/** Whole-page reading progress, drawn as a ring. */
function ProgressRing() {
  const { scrollYProgress } = useScroll();
  const offset = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.svg layout="position" viewBox="0 0 36 36" aria-hidden className="size-6 shrink-0 -rotate-90">
      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="4" className="stroke-white/25" />
      <motion.circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        className="stroke-white"
        style={{ strokeDashoffset: offset }}
      />
    </motion.svg>
  );
}

/**
 * A floating pill that walks the reader through a long case study: the
 * current section slides into view as they scroll, a ring shows how far they
 * are, and a tap opens every section to jump between them.
 */
function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export function CaseStudyGuide({ title, sections }: { title: string; sections: GuideSection[] }) {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(sections);
  const listId = useId();
  const [openRequested, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const viewportWidth = useSyncExternalStore(subscribeResize, () => window.innerWidth, () => 0);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  // Appears once the reader reaches the first section; steps aside for the
  // "Next case study" footer so it never covers it.
  const { scrollY } = useScroll();
  const updateShown = useCallback(() => {
    const first = document.getElementById(sections[0]?.id ?? "");
    const footer = document.getElementById("next-case-study");
    const reached = first ? first.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
    const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false;
    setShown(reached && !atFooter);
  }, [sections]);
  useMotionValueEvent(scrollY, "change", updateShown);

  // Check once after mount, for pages opened part-way down (a hash link or a reload).
  useEffect(() => {
    const frame = requestAnimationFrame(updateShown);
    return () => cancelAnimationFrame(frame);
  }, [updateShown]);

  // The list can only be open while the pill is on screen.
  const open = openRequested && shown;

  // While open: hold the page still, close on Escape, and move focus into the list.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    firstItemRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  const goTo = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    history.replaceState(null, "", `#${id}`);
    // Lenis is stopped while open; restart it before scrolling.
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target, { offset: SCROLL_OFFSET, immediate: Boolean(reduceMotion) });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const isMobile = viewportWidth > 0 && viewportWidth < 640;
  const collapsedWidth = isMobile ? Math.min(COLLAPSED_WIDTH, viewportWidth - 32) : COLLAPSED_WIDTH;
  const expandedWidth = isMobile ? viewportWidth - 32 : EXPANDED_WIDTH;
  // Bottom bar + list padding (20 top, 4 bottom) + one row per section.
  const expandedHeight = ROW + 24 + sections.length * ITEM;
  const blur = (amount: number) => (reduceMotion ? "blur(0px)" : `blur(${amount}px)`);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="guide-backdrop"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-md"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {shown ? (
          <motion.nav
            key="guide"
            aria-label="Case study sections"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: open ? expandedWidth : collapsedWidth,
              height: open ? expandedHeight : ROW,
            }}
            exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            transition={{
              type: "spring",
              visualDuration: 0.3,
              bounce: open ? 0.25 : 0.15,
              opacity: { duration: 0.3, ease: [0.2, 0, 0, 1] },
              y: { type: "spring", visualDuration: 0.4, bounce: 0.15 },
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.15 },
            }}
            style={{ borderRadius: 24, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 overflow-hidden bg-[#141413] text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 dark:bg-[#262624]"
          >
            <div className="absolute inset-x-0 bottom-0 flex flex-col">
              {/* Expanded list */}
              <motion.ul
                id={listId}
                initial={false}
                animate={open ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } }}
                className={open ? "px-5 pt-5 pb-1" : "pointer-events-none h-0 overflow-hidden px-5"}
              >
                {sections.map((section, index) => (
                  <motion.li
                    key={section.id}
                    variants={{
                      hidden: { opacity: 0, filter: blur(8) },
                      visible: { opacity: 1, filter: blur(0), transition: { duration: 0.2, ease: [0.2, 0, 0, 1] } },
                    }}
                  >
                    <button
                      ref={index === 0 ? firstItemRef : undefined}
                      type="button"
                      tabIndex={open ? 0 : -1}
                      onClick={() => goTo(section.id)}
                      aria-current={index === active ? "location" : undefined}
                      className={`flex h-[30px] w-full items-center gap-3 text-left text-[13px] transition-colors duration-150 hover:text-white ${
                        index === active ? "text-white" : "text-white/60"
                      }`}
                    >
                      <span className="w-5 font-mono text-[11px] text-white/40">{String(index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{section.label}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Collapsed row, which stays as the bottom bar when open */}
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={listId}
                aria-label={open ? "Close section list" : `Sections: reading ${sections[active]?.label ?? ""}. Open the list`}
                className="flex h-10 w-full items-center gap-3 px-2 text-left"
              >
                <motion.span
                  layout="position"
                  aria-hidden
                  className="size-6 shrink-0 rounded-full bg-gradient-to-bl from-[#f5b53d] to-[#8f5600]"
                />
                <span className="relative h-10 min-w-0 flex-1 overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {open ? (
                      <motion.span
                        key="title"
                        initial={{ opacity: 0, filter: blur(8) }}
                        animate={{ opacity: 1, filter: blur(0) }}
                        exit={{ opacity: 0, filter: blur(8) }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        className="absolute inset-0 flex items-center truncate text-sm font-medium"
                      >
                        {title}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sections"
                        aria-hidden
                        initial={{ opacity: 0, filter: blur(8), y: -ROW * active }}
                        animate={{ opacity: 1, filter: blur(0), y: -ROW * active }}
                        exit={{ opacity: 0, filter: blur(8) }}
                        transition={{
                          opacity: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                          filter: { duration: 0.2, ease: [0.2, 0, 0, 1] },
                          y: reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                        }}
                        className="absolute inset-x-0 top-0 flex flex-col"
                      >
                        {sections.map((section) => (
                          <span key={section.id} className="flex h-10 shrink-0 items-center truncate text-sm font-medium">
                            {section.label}
                          </span>
                        ))}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <ProgressRing />
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}

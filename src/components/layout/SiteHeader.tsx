"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { SoundToggle } from "@/components/controls/SoundToggle";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { cx } from "@/components/ui/primitives";
import { navItems, profile } from "@/data/profile";
import { EASE_OUT, SPRING_MICRO } from "@/lib/motion";
import { Monogram } from "./Monogram";
import { SiteMenu } from "./SiteMenu";
import { useActiveSection } from "./useActiveSection";

const observedSections = ["top", ...navItems.map((item) => item.id)];

// Ignore tiny scroll jitters so the bar doesn't flicker in and out.
const DIRECTION_THRESHOLD = 6;

/**
 * Full-width while the hero is in view. Past it, the bar condenses into a
 * floating pill that hides on the way down and returns on the way up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeId = useActiveSection(observedSections, isHome);
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const heroEnd = isHome ? window.innerHeight * 0.55 : 80;
    const pastHero = current > heroEnd;

    setIsCompact(pastHero);
    if (!pastHero) {
      setIsHidden(false);
    } else if (current - previous > DIRECTION_THRESHOLD) {
      setIsHidden(true);
    } else if (previous - current > DIRECTION_THRESHOLD) {
      setIsHidden(false);
    }
  });

  // Close the menu after navigating.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <AnimatePresence>{isMenuOpen ? <SiteMenu onClose={closeMenu} /> : null}</AnimatePresence>

      {/* The right gutter keeps the bar clear of the corner menu control. */}
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-130%" : 0 }}
        transition={{ duration: isHidden ? 0.3 : 0.4, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 pr-[7.875rem] pl-3 sm:pr-[8.125rem] sm:pl-4 lg:pr-[8.625rem] xl:pr-4"
      >
        <div
          className={cx(
            "mx-auto border transition-[max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
            isCompact
              ? "mt-3 max-w-[50rem] rounded-[28px] border-line bg-surface/75 px-2.5 shadow-card backdrop-blur-xl"
              : "mt-0 max-w-[88rem] rounded-none border-transparent bg-transparent px-2 sm:px-4 lg:px-8 xl:pr-[9rem]",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" aria-label={`${profile.name}, home`} className="rounded-full">
              <Monogram />
            </Link>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="relative">
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-surface-2"
                          transition={SPRING_MICRO}
                        />
                      ) : null}
                      <a
                        href={hrefFor(item.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={cx(
                          "relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-150",
                          isActive ? "text-fg" : "text-muted hover:text-fg",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-0.5">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-1.5 hidden min-h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85 sm:inline-flex"
              >
                Résumé
              </a>
              <ThemeToggle />
              <SoundToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Pinned to the corner and never hidden on scroll, so the menu is always one tap away. */}
      <div
        className={cx(
          "fixed top-0 right-3 z-50 transition-[margin] duration-500 ease-[cubic-bezier(0.2,0,0,1)] sm:right-4 lg:right-6",
          // Bare text and icon; it only drops to stay level with the condensed pill.
          isCompact ? "mt-[13px]" : "mt-0",
        )}
      >
        <div className="flex h-16 items-center">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            className="group/menu inline-flex h-10 items-center gap-2.5 rounded-full pr-2 pl-3.5 font-mono text-xs tracking-[0.12em] text-fg uppercase"
          >
            Menu
            <span aria-hidden className="flex w-5 flex-col items-end gap-[5px]">
              <span className="h-[1.5px] w-full bg-current" />
              <span className="h-[1.5px] w-3 bg-current transition-[width] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover/menu:w-full" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

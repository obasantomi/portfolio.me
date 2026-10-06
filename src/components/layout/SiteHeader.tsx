"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars2, HiXMark } from "react-icons/hi2";
import { SoundToggle } from "@/components/controls/SoundToggle";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { cx } from "@/components/ui/primitives";
import { navItems, profile } from "@/data/profile";
import { EASE_EMPHASIS, EASE_OUT, SPRING_MICRO } from "@/lib/motion";
import { Monogram } from "./Monogram";
import { useActiveSection } from "./useActiveSection";

const observedSections = ["top", ...navItems.map((item) => item.id)];

const menuList = {
  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)", transition: { duration: 0.2, ease: EASE_OUT } },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_EMPHASIS } },
};

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
  const lenis = useLenis();

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

  // Close the mobile menu after navigating.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  // Freeze the page behind the open menu.
  useEffect(() => {
    if (!isMenuOpen) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [isMenuOpen, lenis]);

  // Close the menu first, then scroll, because Lenis ignores scrolls while stopped.
  const handleMobileLink = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false);
    if (!isHome || !lenis) return;
    event.preventDefault();
    lenis.start();
    lenis.scrollTo(`#${id}`);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const showBar = !isHidden || isMenuOpen;

  return (
    <>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            aria-hidden
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
          />
        ) : null}
      </AnimatePresence>

      <motion.header
        initial={false}
        animate={{ y: showBar ? 0 : "-130%" }}
        transition={{ duration: showBar ? 0.4 : 0.3, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4"
      >
        <div
          className={cx(
            "mx-auto border transition-[max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
            isCompact || isMenuOpen
              ? cx(
                  "mt-3 max-w-[50rem] rounded-[28px] border-line px-2.5 shadow-card backdrop-blur-xl",
                  isMenuOpen ? "bg-surface" : "bg-surface/75",
                )
              : "mt-0 max-w-[88rem] rounded-none border-transparent bg-transparent px-2 sm:px-4 lg:px-8",
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
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-surface-2 md:hidden"
              >
                {isMenuOpen ? <HiXMark className="size-5" /> : <HiBars2 className="size-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMenuOpen ? (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.25, ease: EASE_OUT, delay: 0.05 } }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="overflow-hidden md:hidden"
              >
                <motion.ul
                  variants={menuList}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col border-t border-line px-2 pt-3 pb-5"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.id} variants={menuItem} className="overflow-hidden">
                      <a
                        href={hrefFor(item.id)}
                        onClick={(event) => handleMobileLink(event, item.id)}
                        className="flex min-h-14 items-center font-display text-4xl tracking-[-0.03em]"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li variants={menuItem} className="overflow-hidden">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-14 items-center font-display text-4xl tracking-[-0.03em] text-accent"
                    >
                      Résumé
                    </a>
                  </motion.li>
                </motion.ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}

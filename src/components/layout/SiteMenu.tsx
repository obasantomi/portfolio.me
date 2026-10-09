"use client";

import { motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navItems, profile, socialLinks } from "@/data/profile";
import { EASE_CURTAIN, EASE_EMPHASIS, EASE_OUT } from "@/lib/motion";
import { useLagosTime } from "@/lib/useLagosTime";
import { Monogram } from "./Monogram";

// Same sheet as the page transition, a touch quicker because the menu is opened more often.
const sheet: Variants = {
  hidden: { y: "-100%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE_CURTAIN } },
  exit: { y: "-100%", transition: { duration: 0.75, ease: EASE_CURTAIN, delay: 0.2 } },
};

// Items wait for the sheet to land, then rise out of their own line masks.
const itemList: Variants = {
  visible: { transition: { delayChildren: 0.62, staggerChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const item: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_EMPHASIS } },
  exit: { y: "-105%", transition: { duration: 0.35, ease: EASE_OUT } },
};

const meta: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_EMPHASIS, delay: 1 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.7 } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Each letter is stacked over its twin; hovering rolls the stack up one line. */
function RollingLabel({ label }: { label: string }) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="flex">
        {[...label].map((char, index) => (
          <span key={index} className="menu-roll-char">
            <span className="menu-roll-track" style={{ "--i": index } as React.CSSProperties}>
              <span>{char}</span>
              <span>{char}</span>
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

function MetaLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/meta inline-flex items-center gap-1 text-muted transition-colors duration-200 hover:text-fg"
    >
      {children}
      {external ? (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover/meta:translate-x-0.5 group-hover/meta:-translate-y-0.5"
        >
          ↗
        </span>
      ) : null}
    </a>
  );
}

/**
 * Full-screen menu on every screen size. The same solid sheet as page
 * transitions slides down, the sections rise in one after another, and the
 * sheet retracts upward on close. Jumps within the home page happen while the
 * sheet still covers the screen, so closing reveals the section directly.
 */
export function SiteMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();
  const time = useLagosTime();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Freeze the page behind the sheet.
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep keyboard focus inside the menu while it is open.
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Off the home page, "/#id" links go through the page transition instead.
  const handleSectionLink = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    event.preventDefault();
    const target = document.getElementById(id);
    if (target && lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target?.scrollIntoView();
    onClose();
  };

  return (
    <motion.div
      ref={dialogRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      variants={sheet}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="page-curtain fixed inset-0 z-80 overflow-y-auto"
    >
      <div className="on-curtain mx-auto flex min-h-dvh w-full max-w-[88rem] flex-col px-5 text-fg sm:px-8 lg:px-12">
        <motion.div variants={fade} className="flex h-16 shrink-0 items-center">
          <Monogram />
        </motion.div>
        {/* Same corner as the header's Menu control, so open and close share a spot. */}
        <motion.div variants={fade} className="absolute top-0 right-3 flex h-16 items-center sm:right-4 lg:right-6">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group/close inline-flex h-10 items-center gap-2.5 rounded-full pr-2 pl-3.5 font-mono text-xs tracking-[0.12em] uppercase"
          >
            Close
            <span aria-hidden className="relative block size-5 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/close:rotate-90">
              <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </motion.div>

        <nav aria-label="Primary" className="flex-1 pt-[clamp(2rem,9vh,6rem)] pb-12">
          <motion.ol variants={itemList} className="menu-list flex flex-col">
            {navItems.map((navItem, index) => (
              <li key={navItem.id} className="overflow-hidden">
                <motion.div variants={item}>
                  <Link
                    href={isHome ? `#${navItem.id}` : `/#${navItem.id}`}
                    onClick={(event) => handleSectionLink(event, navItem.id)}
                    className="menu-link flex items-start gap-3 py-1 font-display text-[clamp(3rem,11.5vw,8.75rem)] leading-[0.92] font-bold tracking-[-0.045em] uppercase outline-offset-4 sm:gap-5"
                  >
                    <RollingLabel label={navItem.label} />
                    <span aria-hidden className="mt-[0.35em] font-mono text-[11px] leading-none font-normal tracking-normal text-muted sm:text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </motion.ol>
        </nav>

        <motion.div
          variants={meta}
          className="grid shrink-0 gap-8 pb-8 font-mono text-xs leading-none tracking-[0.08em] uppercase sm:grid-cols-3 sm:pb-12"
        >
          <ul className="flex flex-col gap-3.5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <MetaLink href={link.href} external>
                  {link.label}
                </MetaLink>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3.5 sm:self-end">
            <li>
              <MetaLink href={`mailto:${profile.email}`}>{profile.email}</MetaLink>
            </li>
            <li>
              <MetaLink href={profile.resumeUrl} external>
                Résumé
              </MetaLink>
            </li>
          </ul>
          <p className="flex flex-col gap-3.5 text-muted tabular-nums sm:self-end sm:text-right">
            <span>{profile.location}</span>
            <span>{time ? `${time} WAT` : "WAT"}</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { SPRING_FOLLOW } from "@/lib/motion";
import type { Project } from "@/types";

const PREVIEW_WIDTH = 320;
const PREVIEW_HEIGHT = 200;

/**
 * Compact rows for secondary projects. On devices with a fine pointer, a
 * screenshot follows the cursor so visitors can preview without clicking.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState<Project | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING_FOLLOW);
  const y = useSpring(pointerY, SPRING_FOLLOW);

  const handlePointerMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !listRef.current) return;
    const bounds = listRef.current.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left + 24);
    pointerY.set(event.clientY - bounds.top - PREVIEW_HEIGHT / 2);
  };

  return (
    <div
      ref={listRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovered(null)}
      className="relative mt-6"
    >
      <ul className="border-t border-line">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/work/${project.slug}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHovered(project);
              }}
              className="group grid items-center gap-x-6 gap-y-1 py-6 sm:grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] md:py-7"
            >
              <span className="font-display text-xl tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent md:text-2xl">
                {project.title}
              </span>
              <span className="text-[15px] text-muted md:order-none">{project.tagline}</span>
              <span className="hidden items-center gap-3 text-sm text-muted sm:row-span-2 sm:flex md:row-span-1">
                <span className="hidden lg:inline">{project.stack.slice(0, 3).join(", ")}</span>
                <HiArrowRight
                  aria-hidden
                  className="size-4 text-fg transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
      ))}
      </ul>

      {!reduceMotion ? (
        <AnimatePresence>
          {hovered ? (
            <motion.div
              aria-hidden
              style={{ x, y, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute top-0 left-0 z-10 hidden overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card lg:block"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hovered.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={hovered.cover.src}
                    alt=""
                    fill
                    sizes={`${PREVIEW_WIDTH}px`}
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

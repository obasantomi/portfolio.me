"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { ButtonLink, Container, SectionHeading, StackList, cx } from "@/components/ui/primitives";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import type { Role } from "@/types";

function RoleEntry({ role }: { role: Role }) {
  return (
    <li className="relative pb-14 pl-10 last:pb-0 md:pl-14">
      <span
        aria-hidden
        className={cx(
          "absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border-2 bg-bg",
          role.current ? "border-accent" : "border-line",
        )}
      >
        {role.current ? <span className="size-[5px] rounded-full bg-accent" /> : null}
      </span>

      <p className="text-sm text-muted">
        {role.period}
        <span className="mx-2 text-line" aria-hidden>
          /
        </span>
        {role.location}
      </p>
      <h3 className="mt-1.5 font-display text-2xl tracking-[-0.02em]">
        {role.title},{" "}
        {role.companyUrl ? (
          <a
            href={role.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent"
          >
            {role.company}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          role.company
        )}
      </h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-muted">{role.description}</p>

      <ul className="mt-5 max-w-2xl space-y-2.5">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="relative pl-5 leading-relaxed text-pretty text-fg/90">
            <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-muted" />
            {highlight}
          </li>
        ))}
      </ul>

      <StackList items={role.stack} className="mt-5" />

      {role.caseStudySlug ? (
        <Link
          href={`/projects/${role.caseStudySlug}`}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          Read the {role.company} case study
          <HiArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </li>
  );
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line bg-surface/40 py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="experience-title"
              title="Experience"
              intro="Where I've shipped production software, and what I owned there."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={profile.resumeUrl} variant="secondary" external>
                Full résumé
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line">
            <motion.span
              className="absolute inset-0 origin-top bg-accent"
              style={{ scaleY: reduceMotion ? 1 : progress }}
            />
          </span>
          <ol ref={timelineRef}>
            {experience.map((role) => (
              <RoleEntry key={`${role.company}-${role.title}`} role={role} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

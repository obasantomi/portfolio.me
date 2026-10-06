"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { ButtonLink, Container, cx } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { EASE_EMPHASIS } from "@/lib/motion";
import { HeroField } from "./HeroField";

const headline = [
  { text: "Full-stack engineer", tone: "text-fg" },
  { text: "shipping fintech, AI", tone: "text-fg" },
  { text: "and travel products.", tone: "text-muted" },
];

const ledger = [
  { label: "Now", name: "Tramango", detail: "Full-stack engineer, travel", href: "/work/tramango" },
  { label: "Now", name: "LeadSage Africa", detail: "Full-stack engineer, PropTech and fintech", href: "/work/leadsage" },
  { label: "Built", name: "Analytica", detail: "An AI learning platform, solo", href: "/work/analytica" },
  { label: "Shipped", name: "SageAI", detail: "A WhatsApp AI assistant, built in a week", href: "/work/leadsage" },
];

const lineReveal = {
  hidden: { y: "110%" },
  visible: (index: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE_EMPHASIS, delay: 0.15 + index * 0.12 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EMPHASIS, delay },
  }),
};

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroField />

      <Container className="relative flex flex-1 flex-col pt-28 pb-10 md:pt-32 md:pb-12">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.05}
          variants={fadeIn}
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <a
            href="#contact"
            className="inline-flex min-h-10 items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-4 text-sm font-medium text-success transition-colors hover:bg-success/15"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </a>
          <p className="text-sm text-muted">
            {profile.name}. Based in Lagos, Nigeria, and open to remote work.
          </p>
        </motion.div>

        <div className="flex flex-1 items-center py-10 md:py-12">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.75rem,7.4vw,8rem)] leading-[0.96] font-semibold tracking-[-0.02em]"
          >
            {headline.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={cx("block", line.tone)}
                  custom={index}
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
          <motion.div initial="hidden" animate="visible" custom={0.6} variants={fadeIn} className="lg:col-span-5">
            <p className="max-w-lg text-lg leading-relaxed text-pretty text-muted">
              I&apos;m Tomilola. I own features end to end, from Figma and React to NestJS services, queues,
              databases and payment integrations. Recently I built SageAI, a WhatsApp assistant on Gemini and
              BullMQ, and Paystack-verified partner payouts for Tramango&apos;s events platform.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work">See my work</ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Hire me
              </ButtonLink>
            </div>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="visible"
            custom={0.75}
            variants={fadeIn}
            className="lg:col-span-6 lg:col-start-7"
            aria-label="Where I work and what I've built"
          >
            {ledger.map((entry) => (
              <li key={entry.name} className="border-b border-line first:border-t lg:first:border-t-0">
                <Link
                  href={entry.href}
                  className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-3.5"
                >
                  <span className="text-sm text-muted">{entry.label}</span>
                  <span className="min-w-0">
                    <span className="font-display text-xl tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent md:text-2xl">
                      {entry.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted sm:mt-0 sm:ml-3 sm:inline">{entry.detail}</span>
                  </span>
                  <HiArrowRight
                    aria-hidden
                    className="size-4 translate-y-0.5 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg"
                  />
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

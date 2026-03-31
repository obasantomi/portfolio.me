"use client";

import { motion } from "framer-motion";
import { SocialLinks } from "./SocialLinks";

export const AboutSection = () => {
  return (
    <section
      className="px-4 flex flex-col gap-8 pb-20 pt-10 sm:px-6 md:px-8"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="about-glow-card relative mx-auto max-w-4xl rounded-2xl bg-white p-5"
      >
        <p className="mb-5 text-sm leading-8 text-slate-600 sm:text-base">
          I&apos;m a software engineer based in Lagos, Nigeria. Currently
          studying Computer Science at{" "}
          <a
            href="https://www.covenantuniversity.edu.ng/"
            target="_blank"
            className="font-bold inline-block transform transition-all duration-150 hover:translate-x-1"
          >
            Covenant University
          </a>
          , where I hold a First-Class standing. Excellence isn&apos;t a grade
          to me. It&apos;s just how I work.
        </p>

        <p className="mb-5 text-sm leading-8 text-slate-600 sm:text-base">
          I love building things that work beautifully — scalable software,
          clean architectures, and interfaces that feel as good as they perform.
          The kind you notice when it's done right, and miss when it's not. I
          care deeply about the craft.
        </p>

        <p className="mb-5 text-sm leading-8 text-slate-600 sm:text-base">
          Over the past year, I&apos;ve worked with early-stage startups,
          shipping real products with React, Next.js, TypeScript, Tailwind CSS,
          and AI integration. I&apos;ve also worked on{" "}
          <a
            href="https://www.echo-ng.com/"
            target="_blank"
            className="font-bold transform transition-all inline-block duration-150 hover:translate-x-1"
          >
            Echo
          </a>{" "}
          — a social impact platform built to reward positive action in
          communities.
        </p>

        <p className="mb-5 text-sm leading-8 text-slate-600 sm:text-base">
          What you need isn&apos;t AI, you need a technically skilled engineer who knows how to use it
          well. My strongest asset isn&apos;t any single tool; it&apos;s the
          ability to learn fast, adapt quickly, and figure things out,
          independently, and with precision.
        </p>

        <p className="text-sm leading-8 text-slate-600 sm:text-base">
          I&apos;m currently looking for my next full-time role or contract
          opportunity. Ideally somewhere technical and ambitious, surrounded by
          people who care about what they build and push each other to grow.
        </p>
      </motion.div>
      <div>
        <SocialLinks />
      </div>
    </section>
  );
};

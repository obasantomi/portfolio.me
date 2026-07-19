"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaHome } from "react-icons/fa";
import type { Project } from "@/types";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <main className="bg-white text-slate-900">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-4 py-24 sm:px-6 md:px-8"
      >
        <div className="relative h-150 w-full overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={project.previewImage!}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8">
          <div className="mb-10">
            <h1 className="text-[20px] font-bold">{project.title}</h1>
            <p className="mb-2 text-[15px] text-slate-600">{project.tagline}</p>
          </div>

          {project.title === "NextReel" && (
            <div className="space-y-4 mb-13 text-neutral-700">
              <p>
                As frontend engineers, we all know that one of the most
                important skills is API integration — and that's exactly what
                NextReel focuses on.{" "}
              </p>
              <p>
                NextReel is a movie discovery website heavily powered by the
                TMDB API, while still maintaining a clean, responsive design.
              </p>
              <p>
                It gives you access to trailers, clips, reviews, cast info,
                ratings basically, almost your next Netflix.
              </p>
              <p>
                It provides rich data resources like clips, reviews, cast
                interviews, ratings, and everything you need to make the right
                decision on what movie to watch next (reel).
              </p>
            </div>
          )}
          {project.title === "Game Hub" && (
            <div className="text-neutral-700 mb-13 space-y-4">
              <p>One of my first early projects.</p>
              <p>
                A website where you can explore and discover different video
                games. You can see game details like genre, platform, and
                ratings, and filter through the list to find what you like.
              </p>
              <p>
                I built it using React.js, Tailwind CSS, ChakraUI, and connected
                it to the Rawg.io API for the game data. It's hosted on Vercel.
              </p>
              <p>
                I made this to practice API integration, clean archietectural
                thinking, and improve my front-end skills, and build something
                fun around gaming.
              </p>
            </div>
          )}
          {project.title === "Echo" && (
            <div className="space-y-4 mb-13 text-neutral-700">
              <p>
                Echo is a social impact platform built to encourage meaningful
                action instead of passive engagement.
              </p>{" "}
              <p>
                It allows leaders and communities to gather real feedback from
                their audience while giving users a way to create “waves”,
                helpful actions and ideas that improve their environment.
              </p>
              <p>
                Launched in{" "}
                <Link
                  href={"https://www.covenantuniversity.edu.ng/"}
                  target="_blank"
                >
                  <b>Covenant University</b>
                </Link>{" "}
                and currently used by over 6,000 users,
              </p>
              <p>
                Echo was built with React.js, TypeScript, and Tailwind CSS to
                deliver a fast and scalable experience.
              </p>
              <p>
                The platform uses TanStack Query for efficient data handling,
                Zod for type-safe form validation, and Framer Motion for smooth,
                interactive user experiences.
              </p>
            </div>
          )}
          {project.title === "Analytica" && (
            <div className="text-neutral-700 mb-13 space-y-4">
              <p>
                Analytica is an AI-powered project-based learning platform
                designed to help users learn data analytics through practical,
                real-world experience instead of passive tutorials.
              </p>
              <p>
                {" "}
                The platform combines structured learning paths, adaptive
                AI-generated challenges, and real datasets from APIs and curated
                sources to simulate how real analysts work in industry
                environments.
              </p>
              <p>
                Analytica uses AI to analyze datasets, generate contextual
                analytics tasks, evaluate user submissions, and provide
                intelligent feedback to improve learning outcomes.
              </p>

              <p>
                Built with a modern full-stack architecture using Next.js,
                TypeScript, Prisma ORM, PostgreSQL, Cloudinary, and AI
                integrations, Analytica focuses on making technical learning
                more interactive, practical, and career-oriented.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            {project.tech.map((stack) => (
              <span
                key={stack}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {stack}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#f1f1f1] px-4 py-2 text-[12px] text-neutral-700 transition hover:bg-[#e9e9e9]"
              >
                <FaExternalLinkAlt size={14} />
                View work
              </a>

              <Link
                href="/"
                className="flex items-center gap-2 rounded-full bg-[#f1f1f1] px-4 py-2 text-[12px] text-neutral-700 transition hover:bg-[#e9e9e9]"
              >
                <FaHome size={14} />
                Back to home
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Features</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

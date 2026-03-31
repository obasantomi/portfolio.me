"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
        <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={project.previewImage}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-slate-900">{project.title}</h1>
          <p className="mt-2 text-lg text-slate-600">{project.tagline}</p>
          <p className="mt-6 text-base text-slate-700">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
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
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105"
              >
                Visit Live Site
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ← Back to Projects
              </Link>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">Project URL</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 underline hover:text-blue-700"
              >
                {project.liveUrl}
              </a>
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

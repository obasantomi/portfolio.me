"use client";

import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import type { Project } from "@/types";

interface ProjectPageHeaderProps {
  project: Project;
}

export function ProjectPageHeader({ project }: ProjectPageHeaderProps) {
  return (
    <header className="mt-10 sm:mt-12">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold text-slate-950 sm:text-xl">
            {project.title}
          </h1>
          {project.title !== "LeadSage" && project.title !== "Echo" ? (
            <p className="max-w-xl text-black/50 text-sm">
              {project.tagline} • portfolio project
            </p>
          ) : (
            <p className="max-w-xl text-black/50 text-sm">
              {project.tagline} • Work Experience
            </p>
          )}
        </div>

        <div className="flex items-start md:justify-end">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-3xl bg-black/5 px-4 py-2 text-sm text-slate-900 transition hover:border-slate-300 hover:bg-slate-200"
          >
            <IoIosLink size={14} />
            View work
          </Link>
        </div>
      </div>
    </header>
  );
}

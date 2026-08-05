"use client";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectPageHeader } from "./ProjectPageHeader";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectTools } from "./ProjectTools";
import { ProjectMediaGallery } from "./ProjectMediaGallery";
import { ProjectDemoVideo } from "./ProjectDemoVideo";
import { BackToTop } from "./BackToTop";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const demoVideoSrc = project.demovideo ?? project.video;

  return (
    <main className="bg-white text-slate-900">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:px-8"
      >
        <ProjectNavigation />

        <ProjectPageHeader project={project} />

        <div className="mt-10 space-y-8 text-slate-700">
          <p className="text-base leading-8">{project.description}</p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="relative aspect-video w-full">
            <img
              src={project.previewImage ?? ""}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <ProjectFeatures features={project.features} />

        <ProjectTools tech={project.tech} />

        <ProjectMediaGallery project={project} />
        {demoVideoSrc ? <ProjectDemoVideo videoSrc={demoVideoSrc} /> : null}

        <BackToTop />
      </motion.section>
    </main>
  );
}

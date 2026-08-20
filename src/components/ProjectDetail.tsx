"use client";
import { motion } from "framer-motion";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import type { Project } from "@/types";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectPageHeader } from "./ProjectPageHeader";
import { ProjectFeatures } from "./ProjectFeatures";
import { ProjectTools } from "./ProjectTools";
import { ProjectMediaGallery } from "./ProjectMediaGallery";
import { ProjectDemoVideo } from "./ProjectDemoVideo";
import { BackToTop } from "./BackToTop";
import { div } from "framer-motion/client";

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
        className="mx-auto max-w-4xl  py-20 px-8"
      >
        <ProjectNavigation />

        <ProjectPageHeader project={project} />

        <div className="mt-10 space-y-8 text-slate-700">
          {project.slug === "hsl-hub" && (
            <div className="space-y-8 text-sm">
              <p>
                Being an executive of the Hebron Startup Lab at Covenant
                University, a lead at the Creators Community, which is a family
                of builders and technical individuals, I was given the
                responsibility to lead the development of a full-stack product,
                HSL-HUB, version 1.0.0 website.
              </p>
              <p>
                Going across the frontend and backend, I wrote code, supervised
                development across team members, and managed our GitHub
                workflows and integration. It was a fun one-week sprint that
                required us to move quickly, collaborate closely, and make
                practical engineering decisions to deliver a working product.
              </p>
              <p>
                The result was a successful MVP that gives members a central
                platform to create profiles, discover and join startups,
                collaborate with their teams, and manage tasks. I worked across
                the entire stack, from building the user experience and API
                architecture to implementing authentication, database models,
                authorization, and core startup and task management
                functionality.
              </p>
            </div>
          )}
          {project.slug === "leadsage" && (
            <div className="space-y-8 text-sm">
              <p>
                At LeadSage Africa, I work on building technology that makes the
                process of finding, securing, and saving toward a home simpler
                for Nigerians. My work spans both frontend and backend
                development, where I turn product ideas and Figma designs into
                responsive, production-ready experiences using Next.js, React,
                TypeScript, Node.js, NestJS, and Tailwind CSS.
              </p>
              <p>
                A major part of my work has also involved improving the
                platform's existing experiences. I've redesigned dashboards,
                refined user workflows, and built features around property
                discovery, digital leasing, housing savings, and payments,
                always with a focus on making the product easier and more
                intuitive for everyday users.
              </p>
            </div>
          )}
          {project.slug === "analytica" && (
            <div className="space-y-8 text-sm">
              <p>
                Analytica is one of my very personal projects that I built fully
                from scratch. It is a web application that allows users to
                visualize and analyze data in a user-friendly and interactive
                way. The project was built using Next.js, TypeScript, and
                various data visualization libraries.
              </p>
              <p>
                Instead of following toy tutorials, learners work with
                real-world datasets, receive AI-guided mentorship, and get
                feedback that reflects how professional analysts think, not just
                whether an answer is "correct."
              </p>
              <p>
                This project reminded me that great software isn't just about
                making things work, it's about creating experiences that
                genuinely help people learn and grow. There's still plenty to
                improve, but I'm excited about what's next.
              </p>
            </div>
          )}
          {project.slug === "next-reel" && (
            <div className="space-y-8 text-sm">
              <p>
                NextReel is a movie discovery website heavily powered by the
                TMDB API, while still maintaining a clean, responsive design. It
                gives you access to trailers, clips, reviews, cast info, ratings
                — basically, almost your next Netflix. 👀
              </p>

              <p>
                It provides rich data resources like clips, reviews, cast
                interviews, ratings, and everything you need to make the right
                decision on what movie to watch next (reel). 🌵
              </p>

              <p>
                Overall, building this was more of a fun experience than a
                stressful one — I genuinely enjoyed every part of building it.
              </p>
            </div>
          )}
          {project.slug === "echo" && (
            <div className="space-y-8 text-sm">
              <p>
                Echo is a social impact platform built to reward positive
                action, not distraction. It helps leaders gather meaningful
                feedback from their followers, empowering them to build
                stronger, more sustainable communities. Users don't chase, they
                create waves: helpful actions and ideas that make real
                improvements in their environment. Impact, not profit, is at the
                heart of Echo.
              </p>
              <p>
                I contributed to designing and developing responsive, scalable,
                and user-friendly interfaces using React.js, TypeScript, Zod,
                and many modern libraries. Translating product ideas into
                polished user experiences while collaborating closely with
                designers and other engineers.
              </p>
              <p>
                Beyond the technical experience, the role strengthened my
                collaboration, communication, and problem-solving skills,
                reinforcing the importance of building software that delivers
                meaningful real-world impact rather than simply functional
                features.
              </p>
            </div>
          )}
          {project.slug === "game-hub" && (
            <div className="space-y-8 text-sm">
              <p>
                GameH Hub is a web application that allows users to explore and
                discover a wide range of video games. It provides information
                about different games, including their genres, platforms,
                release dates, and more.
              </p>
              <p>
                I designed and developed responsive, scalable, and user-friendly
                interfaces using React.js, TypeScript, Zod, and many modern
                libraries. Also, handling loading states, error handling, and
                implementing features like search and filtering to enhance the
                user experience.
              </p>
            </div>
          )}
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

        {project.chatbotImage && (
          <div className="mt-14 overflow-hidden rounded-md">
            <p className="text-[11px] text-center mb-5 font-semibold uppercase tracking-[0.2em] text-neutral-400">
              A recently developed feature
            </p>
            <div className="group overflow-hidden rounded-md">
              <div className="relative overflow-hidden rounded-md bg-slate-50 shadow-sm transition-transform duration-300 group-hover:scale-[1.01]">
                <img
                  src={project.chatbotImage}
                  alt={`${project.title} chatbot`}
                  className="object-contain w-full"
                />
              </div>
            </div>
            <div className="mt-10 w-full space-y-8 text-slate-700">
              <p>
                Recently, LeadSage needed to launch a personalized AI assistant
                that could communicate with users directly through WhatsApp. It
                was an urgent product requirement, and I had one week to design
                and implement the entire backend system. I built the assistant
                using NestJS, Google Gemini, Redis Cloud, and BullMQ,
                implementing background workers and queue processing to handle
                AI conversations efficiently without slowing down the main API.
              </p>
              <p>
                The result was SageAI — an assistant capable of understanding a
                user's context and providing personalized guidance around their
                property search, rent savings, tours, wallets, and payments. It
                was one of those projects where I had to move quickly, make
                architectural decisions under pressure, and take a feature from
                an urgent requirement to a working product in a matter of days.
              </p>
            </div>
          </div>
        )}

        <ProjectMediaGallery project={project} />

        {(project.githubUrl || project.linkedinUrl) && (
          <section className="mt-10 rounded-3xl">
            <div className="mx-auto flex items-center justify-center gap-3 py-8 max-w-60">
              <span className="h-0.5 w-12 rounded-full bg-slate-300" />
              <span className="h-0.5 w-12 rounded-full bg-slate-300" />
              <span className="h-0.5 w-12 rounded-full bg-slate-300" />
            </div>
            <div className="grid gap-4 text-sm leading-7 text-slate-700">
              {project.githubUrl ? (
                <div className="flex flex-wrap items-center gap-2 text-slate-900">
                  <AiFillGithub className="h-4 w-4 text-slate-600" />
                  <span className="font-medium">GitHub repository:</span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-900 underline transition hover:text-slate-700"
                  >
                    View repository
                  </a>
                </div>
              ) : null}
              {project.linkedinUrl ? (
                <div className="flex flex-wrap items-center gap-2 text-slate-900">
                  <AiFillLinkedin className="h-4 w-4 text-slate-600" />
                  <span className="font-medium">LinkedIn:</span>
                  <a
                    href={project.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-900 underline transition hover:text-slate-700"
                  >
                    View profile
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {demoVideoSrc ? <ProjectDemoVideo videoSrc={demoVideoSrc} /> : null}

        <BackToTop />
      </motion.section>
    </main>
  );
}

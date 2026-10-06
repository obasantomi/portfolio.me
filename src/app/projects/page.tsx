import type { Metadata } from "next";
import Link from "next/link";
import { RevealImage } from "@/components/media/RevealImage";
import { Container, StackList } from "@/components/ui/primitives";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Products and projects built by Tomilola Obasan, from company platforms to solo builds.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
      <h1 className="font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[1] tracking-[-0.03em]">
        Projects
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Everything I&apos;ve built that I can show, from company platforms to products I took from idea to deployment on
        my own.
      </p>

      <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <RevealImage
                image={project.cover}
                sizes="(min-width: 768px) 560px, 100vw"
                priority={index < 2}
                className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
              />
              <p className="mt-5 text-sm text-muted">
                {project.context}
                {project.year ? `, ${project.year}` : null}
              </p>
              <h2 className="mt-1 font-display text-2xl tracking-[-0.02em] transition-colors group-hover:text-accent">
                {project.title}
              </h2>
              <p className="mt-2 leading-relaxed text-pretty text-muted">{project.summary}</p>
            </Link>
            <StackList items={project.stack.slice(0, 5)} className="mt-4" />
          </li>
        ))}
      </ul>
    </Container>
  );
}

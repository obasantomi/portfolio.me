import Link from "next/link";
import { CapVideoDialogButton } from "@/components/media/CapVideo";
import { RevealImage } from "@/components/media/RevealImage";
import { ButtonLink, Container, SectionHeading, StackList, cx } from "@/components/ui/primitives";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { ProjectList } from "./ProjectList";

const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

function FeaturedProject({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Link
        href={`/work/${project.slug}`}
        className={cx("group block lg:col-span-7", reversed && "lg:order-2")}
        aria-label={`${project.title} case study`}
        tabIndex={-1}
      >
        <RevealImage
          image={project.cover}
          sizes="(min-width: 1024px) 640px, 100vw"
          reveal
          className="shadow-card transition-transform duration-500 ease-out group-hover:-translate-y-1"
        />
      </Link>

      <div className={cx("lg:col-span-5", reversed && "lg:order-1")}>
        <p className="text-sm text-muted">
          {project.context}
          {project.year ? `, ${project.year}` : null}
        </p>
        <h3 className="mt-2 font-display text-3xl tracking-[-0.02em] md:text-4xl">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted md:text-lg">{project.summary}</p>
        <p className="mt-4 text-sm text-fg">
          <span className="text-muted">Role: </span>
          {project.role}
        </p>
        <StackList items={project.stack.slice(0, 6)} className="mt-5" />
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={`/work/${project.slug}`}>Read the case study</ButtonLink>
          {project.demo ? <CapVideoDialogButton video={project.demo} /> : null}
          {!project.demo && project.links.live ? (
            <ButtonLink href={project.links.live} variant="secondary" external>
              Visit live site
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="pt-12 pb-20 md:pt-16 md:pb-32">
      <Container>
        <SectionHeading
          id="work-title"
          title="Selected work"
          intro="Products I've designed, built and shipped, from company platforms to products I took from idea to deployment on my own."
        />

        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} reversed={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <h3 className="font-display text-xl tracking-[-0.02em]">More work</h3>
          <ProjectList projects={otherProjects} />
          <ButtonLink href="/work" variant="secondary" className="mt-10">
            View all work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

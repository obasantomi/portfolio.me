import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { CapInlineVideo } from "@/components/media/CapVideo";
import { RevealImage } from "@/components/media/RevealImage";
import { SystemTrace } from "@/components/project/SystemTrace";
import { ButtonLink, Container, StackList } from "@/components/ui/primitives";
import type { Project } from "@/types";

function ProjectLinks({ project }: { project: Project }) {
  const { live, github, linkedin } = project.links;
  if (!live && !github && !linkedin) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {live ? (
        <ButtonLink href={live} external>
          Visit live site
        </ButtonLink>
      ) : null}
      {github ? (
        <ButtonLink href={github} variant="secondary" external>
          View source
        </ButtonLink>
      ) : null}
      {linkedin ? (
        <ButtonLink href={linkedin} variant="ghost" external>
          LinkedIn post
        </ButtonLink>
      ) : null}
    </div>
  );
}

export function CaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <article>
      <Container className="pt-28 md:pt-32">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <HiArrowLeft aria-hidden className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          All projects
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-sm text-muted">
              {project.context}
              {project.year ? `, ${project.year}` : null}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.98] tracking-[-0.035em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-snug text-pretty text-muted md:text-2xl">{project.tagline}</p>
          </div>
          <dl className="space-y-4 text-sm lg:col-span-4">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-0.5 font-medium">{project.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Stack</dt>
              <dd className="mt-0.5 leading-relaxed font-medium">{project.stack.join(", ")}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>

        <div className="mt-12 md:mt-16" id={project.demo ? "demo" : undefined}>
          {project.demo ? (
            <>
              <CapInlineVideo video={project.demo} poster={project.cover} />
              <p className="mt-3 text-sm text-muted">A walkthrough of {project.title}, recorded by me.</p>
            </>
          ) : (
            <RevealImage image={project.cover} sizes="(min-width: 1152px) 1088px, 100vw" priority className="shadow-card" />
          )}
        </div>
      </Container>

      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <section aria-labelledby="overview-title" className="lg:col-span-7">
            <h2 id="overview-title" className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
              Overview
            </h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-pretty text-muted">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="built-title" className="lg:col-span-5">
            <h2 id="built-title" className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
              What I built
            </h2>
            <ul className="mt-5 border-t border-line">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="border-b border-line py-3.5 leading-relaxed text-pretty">
                  {highlight}
                </li>
              ))}
            </ul>
            <StackList items={project.stack} className="mt-6" />
          </section>
        </div>

        {project.spotlight ? (
          <section aria-labelledby="spotlight-title" className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-24">
            <h2
              id="spotlight-title"
              className="max-w-4xl font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-balance"
            >
              {project.spotlight.title}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted lg:col-span-6">
                {project.spotlight.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="lg:col-span-6">
                {project.spotlight.diagram === "sageai-pipeline" ? (
                  <>
                    <SystemTrace />
                    <p className="mt-3 px-1 text-sm text-muted">A simplified view of the SageAI message pipeline.</p>
                  </>
                ) : null}
              </div>
            </div>
            {project.spotlight.image ? (
              <div className="relative mt-16 aspect-[2870/1968] overflow-hidden rounded-2xl border border-line bg-surface-2">
                <Image
                  src={project.spotlight.image.src}
                  alt={project.spotlight.image.alt}
                  fill
                  sizes="(min-width: 1408px) 1250px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {project.gallery.length > 0 ? (
          <section aria-labelledby="gallery-title" className="mt-24 md:mt-32">
            <h2 id="gallery-title" className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
              Inside the product
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <figure>
                    <RevealImage image={image} sizes="(min-width: 768px) 540px, 100vw" />
                    <figcaption className="mt-3 text-sm text-muted">{image.alt}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>

      <Link href={`/projects/${nextProject.slug}`} className="group block border-t border-line">
        <Container className="flex items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="text-sm text-muted">Next project</p>
            <p className="mt-2 font-display text-[clamp(2rem,5vw,3.75rem)] leading-none tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
              {nextProject.title}
            </p>
            <p className="mt-3 text-muted">{nextProject.tagline}</p>
          </div>
          <HiArrowRight
            aria-hidden
            className="mb-2 size-8 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2"
          />
        </Container>
      </Link>
    </article>
  );
}

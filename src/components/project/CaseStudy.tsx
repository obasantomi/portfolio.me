import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { CapInlineVideo } from "@/components/media/CapVideo";
import { RevealImage } from "@/components/media/RevealImage";
import { SystemTrace } from "@/components/project/SystemTrace";
import { ButtonLink, Container, StackList, cx } from "@/components/ui/primitives";
import type { Project, Screen, Spotlight } from "@/types";

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

const isPanorama = (screen: Screen) => screen.width / screen.height > 2;

/**
 * Screens keep their natural aspect ratio. Very wide ones span the full row,
 * and so does the first screen when the rest would otherwise leave one alone on a row.
 */
function SpotlightScreens({ screens }: { screens: Screen[] }) {
  const isSingle = screens.length === 1;
  const leadSpans = screens.filter((screen) => !isPanorama(screen)).length % 2 === 1;

  return (
    <ul className={cx("mt-16 grid gap-x-6 gap-y-10", !isSingle && "md:grid-cols-2")}>
      {screens.map((screen, index) => {
        const isWide = isSingle || isPanorama(screen) || (leadSpans && index === 0);
        return (
          <li key={screen.src} className={cx(isWide && "md:col-span-2")}>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes={isWide ? "(min-width: 1408px) 1250px, 100vw" : "(min-width: 768px) 620px, 100vw"}
                  className="h-auto w-full"
                />
              </div>
              {screen.caption ? <figcaption className="mt-3 text-sm text-muted">{screen.caption}</figcaption> : null}
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

function SpotlightSection({ spotlight, id }: { spotlight: Spotlight; id: string }) {
  const hasDiagram = spotlight.diagram === "sageai-pipeline";

  return (
    <section aria-labelledby={id} className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-24">
      <h2
        id={id}
        className="max-w-4xl font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-balance"
      >
        {spotlight.title}
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div
          className={cx(
            "space-y-5 text-lg leading-relaxed text-pretty text-muted",
            hasDiagram ? "lg:col-span-6" : "lg:col-span-8",
          )}
        >
          {spotlight.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {hasDiagram ? (
          <div className="lg:col-span-6">
            <SystemTrace />
            <p className="mt-3 px-1 text-sm text-muted">A simplified view of the SageAI message pipeline.</p>
          </div>
        ) : null}
      </div>
      {spotlight.screens?.length ? <SpotlightScreens screens={spotlight.screens} /> : null}
    </section>
  );
}

export function CaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <article>
      <Container className="pt-28 md:pt-32">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <HiArrowLeft aria-hidden className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          All work
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
              <p className="mt-3 text-sm text-muted">{project.demo.caption ?? `A walkthrough of ${project.title}, recorded by me.`}</p>
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

        {project.spotlights?.map((spotlight, index) => (
          <SpotlightSection key={spotlight.title} spotlight={spotlight} id={`spotlight-${index + 1}`} />
        ))}

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

      <Link href={`/work/${nextProject.slug}`} className="group block border-t border-line">
        <Container className="flex items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="text-sm text-muted">Next case study</p>
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

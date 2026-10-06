import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/project/CaseStudy";
import { getAdjacentProject, getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Work not found" };

  const title = `${project.title} case study`;
  const url = `/work/${project.slug}`;
  const images = [{ url: encodeURI(project.cover.src), alt: project.cover.alt }];

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: project.summary, images },
    twitter: { card: "summary_large_image", title, description: project.summary, images },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} nextProject={getAdjacentProject(slug)} />;
}

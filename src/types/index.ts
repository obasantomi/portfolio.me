export interface ImageAsset {
  src: string;
  alt: string;
}

export interface DemoVideo {
  /** Share id from a cap.so link, e.g. cap.so/s/<id>. */
  capId: string;
  title: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  linkedin?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  /** One or two sentences used on cards and in metadata. */
  summary: string;
  role: string;
  context: string;
  year?: string;
  featured?: boolean;
  overview: string[];
  highlights: string[];
  stack: string[];
  links: ProjectLinks;
  cover: ImageAsset;
  gallery: ImageAsset[];
  demo?: DemoVideo;
  /** A deeper write-up of one piece of the project, shown on the case study. */
  spotlight?: {
    title: string;
    /** An animated diagram shown beside the write-up. */
    diagram?: "sageai-pipeline";
    image?: ImageAsset;
    paragraphs: string[];
  };
}

export interface Role {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  description: string;
  highlights: string[];
  stack: string[];
  caseStudySlug?: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

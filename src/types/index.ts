export interface ImageAsset {
  src: string;
  alt: string;
}

/** A screenshot shown at its natural aspect ratio, with an optional caption. */
export interface Screen extends ImageAsset {
  width: number;
  height: number;
  caption?: string;
}

export interface DemoVideo {
  /** Share id from a cap.so link, e.g. cap.so/s/<id>. */
  capId: string;
  title: string;
  /** Shown under the inline player. Defaults to a walkthrough of the whole product. */
  caption?: string;
}

/** A deeper write-up of one piece of the work, shown on the case study. */
export interface Spotlight {
  title: string;
  /** An animated diagram shown beside the write-up. */
  diagram?: "sageai-pipeline";
  paragraphs: string[];
  screens?: Screen[];
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
  spotlights?: Spotlight[];
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

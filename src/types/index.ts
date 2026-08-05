export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  tech: string[];
  features: string[];
  previewImage?: string;
  images?: string[];
  demovideo?: string;
  video?: string;
  previewVideo?: string;
  backendTools?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  tech: string[];
  features: string[];
  previewImage: string;
  backendTools?: string[];
}

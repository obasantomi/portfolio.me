import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "game-hub",
    title: "Game Hub",
    tagline: "Explore & discover video games",
    description:
      "Game Hub helps players discover and explore video games with rich metadata and filtering. Users can view game details including genre, platform, and ratings.",
    liveUrl: "https://game-hub-nine-neon.vercel.app/",
    githubUrl: "",
    tech: ["React.js", "Tailwind CSS", "RAWG API", "Vercel"],
    features: [
      "Browse and discover video games",
      "View game details: genre, platform, and ratings",
      "Filter games by genre and platform",
      "Powered by the RAWG.io API",
    ],
    previewImage:
      "https://api.microlink.io/?url=https://game-hub-nine-neon.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
  },
  {
    slug: "next-reel",
    title: "NextReel",
    tagline: "Your next movie, decided.",
    description:
      "NextReel surfaces movies and series with trailers, reviews and cast information via the TMDB API in a clean responsive interface.",
    liveUrl: "https://nextreel-orcin.vercel.app/",
    githubUrl: "",
    tech: ["Next.js", "TMDB API", "Tailwind CSS"],
    features: [
      "Movie discovery powered by TMDB API",
      "Watch trailers and clips",
      "Read reviews and cast interviews",
      "Ratings and rich media resources",
      "Clean, responsive design",
    ],
    previewImage:
      "https://api.microlink.io/?url=https://nextreel-orcin.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
  },
  {
    slug: "echo",
    title: "Echo",
    tagline: "Create waves. Drive impact.",
    description:
      "Echo is a social-impact platform that lets users create meaningful actions and collect feedback with an emphasis on community-driven value.",
    liveUrl: "https://www.echo-ng.com/",
    githubUrl: "",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Social impact platform rewarding positive action",
      "Leaders gather meaningful feedback from followers",
      "Users create 'waves' — helpful community actions",
      "Focused on impact, not profit",
    ],
    previewImage:
      "https://api.microlink.io/?url=https://www.echo-ng.com/&screenshot=true&meta=false&embed=screenshot.url",
  },
];

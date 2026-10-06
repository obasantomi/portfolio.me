# Tomilola Obasan — Portfolio

Personal portfolio for Tomilola Obasan, a full-stack software engineer in Lagos.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion and Lenis.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain used for canonical links, share images and the sitemap. On Vercel the production URL is used when this is unset. |

## Structure

```
src/
  app/            routes, metadata, share image, icons, sitemap, robots
  components/
    home/         home page sections (hero, work, experience, about)
    project/      case study page and the SageAI pipeline diagram
    contact/      contact section and form
    layout/       header, footer, monogram
    media/        images and Cap video embeds
    providers/    theme, audio, smooth scrolling
    controls/     theme and music toggles
    ui/           shared primitives
  data/           all site content: profile, experience, projects, skills
  lib/            motion tokens, site config, hooks
```

Content lives in `src/data/`, so copy changes don't touch UI code. Theme colours are CSS variables in `src/app/globals.css`.

import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tramango",
    title: "Tramango",
    tagline: "Flights, travel insurance and event tickets for Nigerian travellers",
    summary:
      "Full-stack work across a Nigerian travel platform, including an events guest list now live in production and a travel insurance flow I rebuilt on the Allianz API.",
    role: "Full-stack engineer",
    context: "Tramango",
    year: "2026",
    featured: true,
    overview: [
      "Tramango is a Nigerian travel platform where people book flights, buy travel insurance, find events and buy tickets, and book travel packages. It runs on a microservices architecture: Node.js services behind an API gateway, with a Next.js web app in front.",
      "I joined in September 2026 and work across the stack, mostly on events and insurance. I take each feature from the product brief and Figma to pull requests on both the backend and the web app, with tests, and ship it through code review to production. Working across services also means working on how they ship: CI/CD workflows, Docker images and deployment configuration on Kubernetes.",
    ],
    highlights: [
      "An events guest list, live in production. Creators invite free guests one by one or through shareable registration links with a sign-up limit.",
      "Role-based partner teams: event partners invite people by email as read-only Members or Admins who can edit the partner's existing events, with roles enforced on the server on every request.",
      "Allianz travel insurance quotes that match every destination to the plan Allianz actually sells there.",
      "A full-page insurance booking flow with saved drafts, per-field validation and a confirmation page that follows policy issuance.",
      "Verified partner payouts with Paystack: a searchable list of Nigerian banks, with account names resolved on the server before anything is saved.",
      "A CSV export of every event order for the finance team, restricted to super admins and protected against spreadsheet formula injection.",
      "Scheduled event publishing that goes live on time, with a backup check every seven minutes for missed schedules.",
      "Event image uploads that compress to under 1 MB, crop in the browser and reject unsupported formats with a clear message.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "Paystack", "Allianz API"],
    links: {
      live: "https://tramango.com",
    },
    cover: {
      src: "/images/tramango-insurance-landing.png",
      alt: "Tramango travel insurance page with quote search and popular Allianz plans",
    },
    gallery: [],
    demo: {
      capId: "5cx1v9bxzcepgfa",
      title: "Tramango events guest list walkthrough",
      caption: "The events guest list in production, recorded by me.",
    },
    spotlights: [
      {
        title: "A guest list that never touches ticket sales",
        paragraphs: [
          "Event creators needed a way to invite people for free without selling them a ticket. The hard part was the boundary: guests still need a QR ticket and a smooth check-in at the door, but they must never show up in ticket sales, revenue or payouts.",
          "I added guests and registration links as new tables without altering any existing one. Each guest gets a zero-value purchase record that runs through the existing ticket issuance, QR and check-in pipeline unchanged, the same approach the platform already used for walk-in sales. Attendee, revenue and sales queries leave guests out.",
          "Creators add guests one by one or share a registration link with a sign-up limit. A row lock in PostgreSQL enforces that limit, so it holds even when many people register at the same moment. Guests get their own RSVP email, and removing a guest revokes their ticket immediately.",
          "The tests run against real PostgreSQL and Redis and include a check that ticket inventory, sales, revenue and payouts are identical before and after guests exist. On the web app I added a Guests tab for creators, a public registration page, and a fix for an Attendees tab that had always been empty.",
        ],
      },
      {
        title: "Partner teams with role-based access",
        paragraphs: [
          "Event partners were sharing one login so their staff could check sales and manage events. I built partner teams so each person gets their own account and only the access they need.",
          "A partner invites someone by email as a Member or an Admin. Members can view every event the partner owns, including analytics, transactions and issued tickets, but can't change anything. Admins can also edit the partner's existing events. Only the partner manages the team, and they can promote, demote, resend or remove members at any time.",
          "Access is checked on the server on every request, so a role change takes effect on the person's next click. The events service resolves each request to owner, team admin or member and answers a Member's write with a clear read-only error. I kept the team admin role separate from Tramango's own platform admin so the two can never be confused, and every role change is written to an audit log.",
          "The invitation flow works whether or not the invitee already has a Tramango account: they accept while signed in, sign in and come back, or create an account on the spot through the auth service, with Google sign-in returning them to the invitation too. On the web app I added a Team tab, a page listing the partners you belong to, and a read-only mode where edit actions explain why they're unavailable. The work spans the auth service, the API gateway, the events service and the partner dashboard, with tests for each role.",
        ],
        screens: [
          {
            src: "/images/tramango-partner-team.png",
            alt: "Team tab on a partner's event page, with an invite form offering Member or Admin roles and a list of team members",
            caption: "Partners invite teammates as Members or Admins and can change a role straight from the list.",
            width: 1568,
            height: 438,
          },
        ],
      },
      {
        title: "Rebuilding travel insurance on the Allianz API",
        paragraphs: [
          "Travel insurance is one of Tramango's core products, underwritten by Allianz Nigeria. When I picked it up, customers couldn't get a quote at all, and booking ran through a modal wizard that no longer matched the design.",
          "I started with the Allianz integration. I mapped the 197 destinations Allianz Nigeria covers to their Allianz country IDs and the plans each one is eligible for: Schengen, Worldwide Gold, and Hajj and Umrah for Saudi Arabia. Quotes no longer fall back to a default plan, unsupported destinations get a clear message instead of a broken quote, and quotes Allianz can't actually sell, such as a zero-priced plan, are filtered out before a customer sees them.",
          "Next I made confirmation honest. A booking is confirmed only once Allianz issues a policy number. Before, customers could receive a policy email even when issuance had failed. Now they get a plain 'policy not issued' email, staff are alerted, and the confirmation page shows the real Allianz policy number while it re-checks issuance for up to a minute.",
          "Then I restructured the booking flow. The modal became a full-page, four-step flow: traveller details, next of kin, plan, then overview and payment. It has per-field validation for phone numbers, passports and coverage dates, a two-column layout from Figma, and a saved draft so customers can pick up where they left off. Destination search only offers countries Allianz covers, and each plan shows Allianz's published benefits and a whole-naira price.",
        ],
        screens: [
          {
            src: "/images/tramango-insurance-landing.png",
            alt: "Tramango insurance landing page with quote search, a saved draft to resume, and popular Allianz plans",
            caption: "Quote search, a saved draft to resume, and starting prices for popular destinations.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/tramango-insurance-traveller.png",
            alt: "Traveller details step of the insurance booking flow, with passport and coverage fields",
            caption: "Traveller details, validated field by field, beside a summary of the trip.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/tramango-insurance-plan.png",
            alt: "Insurance plan step showing the Allianz Worldwide Gold plan priced in naira",
            caption: "The plan step offers only the Allianz plan this destination is eligible for.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/tramango-insurance-benefits.png",
            alt: "Insurance landing page section explaining Allianz cover, policy delivery and naira pricing",
            caption: "What a policy covers, written in plain language on the landing page.",
            width: 2000,
            height: 771,
          },
        ],
      },
    ],
  },
  {
    slug: "hsl-hub",
    title: "HSL Hub",
    tagline: "The platform Hebron Startup Lab's founders and talents run on",
    summary:
      "As Lead of Technical Infrastructure at Hebron Startup Lab, I build and run the platform that connects its founders, talents and weekly community meetings, shipping against requirements that change as the community does.",
    role: "Lead, Technical Infrastructure",
    context: "Hebron Startup Lab, Covenant University",
    year: "2026",
    featured: true,
    overview: [
      "Hebron Startup Lab is Covenant University's startup accelerator: student founders building companies, and the talents who build with them, from engineers and designers to marketers and creators.",
      "I lead its technical infrastructure. HSL Hub began as a one-week MVP for profiles, startups and tasks. Since then I've grown it into the platform the community actually runs on, while the shape of the community itself kept changing. Most of the work has been designing for that change, not just adding features.",
    ],
    highlights: [
      "Founder-reviewed join requests: members ask to join a startup, founders accept or decline from the startup page, and the requester is notified either way.",
      "A People directory that separates founders from talents and groups talents by discipline, so members can find who they need.",
      "A community restructure shipped without re-onboarding anyone: existing members were migrated automatically by inferring their discipline from their skills.",
      "Public pages for the weekly community meetings, with session write-ups, takeaways, photos and every speaker's deck.",
      "An admin dashboard where the HSL team reviews startups before they go live.",
      "Consistent failure handling across the API, web app and admin dashboard, with typed error codes, traceable request IDs and clear recovery for users.",
    ],
    stack: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Zod",
      "Firebase Auth",
      "Sanity",
      "Vercel",
      "Render",
    ],
    links: {
      live: "https://hsl-hub-lime.vercel.app/meetings",
      linkedin: "https://www.linkedin.com/company/hebron-startup-lab/posts/?feedView=all",
    },
    cover: {
      src: "/images/hsl-dashboard.png",
      alt: "HSL Hub dashboard with the startups and talents strip and a grouped sidebar",
    },
    gallery: [
      { src: "/images/hsl-signup.png", alt: "The HSL Hub sign-up page with onboarding progress" },
    ],
    spotlights: [
      {
        title: "Building for requirements that keep moving",
        paragraphs: [
          "Student communities reorganise often, and HSL did it mid-build: four sub-communities were scrapped for a simpler split between startups and talents. Starting over would have meant asking every member to sign up again.",
          "Instead, I replaced communities with seven disciplines that cover every skill a member can list, from engineering and design to content and operations. A single migration inferred each existing member's discipline from the specialty they had already chosen, so the change was invisible to them.",
          "Founder is no longer something members pick. Anyone who owns a startup is a founder and everyone else is a talent, and because that's computed rather than stored, the directory stays correct as startups are created, approved or removed. I shipped it in small, additive steps, backend first, so the live platform never broke during the switch.",
        ],
        screens: [
          {
            src: "/images/hsl-people.png",
            alt: "HSL Hub People directory with founders listed first and talents grouped by discipline",
            caption: "The People directory: founders first, then talents by discipline.",
            width: 2000,
            height: 1301,
          },
        ],
      },
      {
        title: "Making the weekly meetings last beyond the room",
        paragraphs: [
          "Every Friday, someone who has built something speaks to the community. Afterwards the lessons and slides used to disappear into group chats. Now each session has its own public page with a write-up, key takeaways, photos and the speaker's deck, and readers move between sessions from a side tracker, like chapters of a book.",
          "Decks arrive in every format. PowerPoints become images behind a fast in-page viewer with keyboard, swipe and full-screen support. Decks built as websites are embedded live, so their interactive parts still work. The team publishes sessions from a hosted Studio, so posting one never waits on an engineer.",
        ],
        screens: [
          {
            src: "/images/hsl-meeting.png",
            alt: "A community meeting page in HSL Hub with the session tracker and the speaker's slides",
            caption: "A session page, with the tracker on the left and the slide viewer.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/hsl-meetings.png",
            alt: "HSL Hub community meetings index listing recent sessions",
            caption: "Every session, newest first.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/hsl-slides.png",
            alt: "HSL Hub slide library with each deck linked to the session it was presented at",
            caption: "The slide library, with every deck linked back to its session.",
            width: 2000,
            height: 1301,
          },
        ],
      },
      {
        title: "Failing gracefully on student-grade infrastructure",
        paragraphs: [
          "HSL runs on free-tier hosting, so cold starts and idle databases are part of normal life. I made failure a designed experience instead of an afterthought. Every API error carries a stable code, a message written for people and a request ID that matches the server logs, so a member's report can be traced in seconds.",
          "The clients act on those codes. An expired session refreshes silently and retries once before asking anyone to sign in again, slow wake-ups time out with an honest message instead of hanging, only failures that can recover are retried, and an offline banner explains why nothing is saving. No user ever sees a stack trace or a raw database error.",
        ],
      },
    ],
  },
  {
    slug: "analytica",
    title: "Analytica",
    tagline: "An AI-powered learning platform for aspiring data analysts",
    summary:
      "A full-stack platform that turns real-world datasets into guided analytics projects, with an AI mentor and professional-style feedback.",
    role: "Solo build, design to deployment",
    context: "Personal product",
    year: "2026",
    featured: true,
    overview: [
      "Aspiring data analysts usually practise on toy tutorials that look nothing like real work. Analytica gives them realistic projects instead: real datasets, a business brief, guidance from an AI mentor, and feedback that reflects how professional analysts think, not just whether an answer is correct.",
      "I built it from scratch, from the product design and landing page to the data model, authentication, AI workflows and deployment. It runs on Next.js, TypeScript, Prisma and PostgreSQL, with Gemini generating projects and feedback from World Bank data.",
    ],
    highlights: [
      "AI-generated analytics projects built on real datasets from the World Bank Data API, with contextual mentorship and feedback.",
      "Project evaluation workflows that score submissions and explain what to improve.",
      "Progress tracking and a skill radar, backed by PostgreSQL, so learners can see measurable growth.",
      "Authentication and protected sessions with NextAuth.",
      "CSV downloads rebuilt on demand from each project's stored World Bank query.",
      "A scrollytelling landing page built with Framer Motion.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Gemini", "Zod", "Tailwind CSS", "Recharts"],
    links: {
      live: "https://analytica-app-flame.vercel.app/",
      github: "https://github.com/obasantomi/Analytica-app.git",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_after-weeks-of-designing-building-refining-ugcPost-7484327790079713280-06fU/",
    },
    cover: { src: "/images/analytica-final.png", alt: "Analytica landing page with a live project preview" },
    gallery: [
      { src: "/images/analytica-dashboard.png", alt: "Analytica learner dashboard" },
      { src: "/images/analytica-new.png", alt: "Starting a new AI-generated project in Analytica" },
    ],
    demo: { capId: "11ynd1y4shjcvz4", title: "Analytica product walkthrough" },
    spotlights: [
      {
        title: "From raw public data to a real brief",
        paragraphs: [
          "Every project starts with real numbers. Analytica picks an indicator, a country and a time window from the World Bank Data API, cleans the rows and summarises them: the range, the extremes and the trend. Gemini turns that summary into a short business brief, one falsifiable hypothesis and five to seven questions, each tagged with the skill it trains and a hint.",
          "AI output that drives a page has to be dependable, so the questions are generated against a JSON schema built from the same Zod schema that validates them. Anything malformed is rejected instead of rendering half a project. Projects store only the dataset query, not the data, so a learner's CSV download is rebuilt from the source on demand.",
        ],
        screens: [
          {
            src: "/images/analytica-details.png",
            alt: "An Analytica project brief with its dataset details, hypothesis and questions",
            caption: "A generated project: the brief, the dataset and the questions to answer.",
            width: 3420,
            height: 2146,
          },
        ],
      },
      {
        title: "Feedback that adds up to a skill profile",
        paragraphs: [
          "When a learner submits, a second Gemini pass reviews their answers the way a senior analyst would. It returns a structured result: an overall grade, a score and feedback for each of five areas (cleaning, visualisation, storytelling, statistical awareness and insight), and an ideal answer for every question.",
          "Those scores feed a skill radar that should show growth, not the last attempt. Each new score is blended into the learner's history as a moving average, so one great or poor project nudges the profile instead of resetting it. The mentor beside each project is grounded the same way: it only reasons from that project's dataset summary and says so when a question needs more data than it has.",
        ],
        screens: [
          {
            src: "/images/analytica-feedback.png",
            alt: "Analytica AI feedback with an overall grade and per-skill scores",
            caption: "The review: an overall grade, scores per skill and feedback on every answer.",
            width: 3420,
            height: 2146,
          },
        ],
      },
    ],
  },
  {
    slug: "leadsage",
    title: "LeadSage Africa",
    tagline: "Property, payments and an AI assistant for Nigerian renters",
    summary:
      "PropTech and fintech features end to end, including SageAI, a WhatsApp assistant I designed and built on NestJS, Gemini, Redis and BullMQ.",
    role: "Full-stack engineer",
    context: "LeadSage Africa",
    year: "2026",
    featured: true,
    overview: [
      "LeadSage Africa makes finding, securing and saving toward a home simpler for Nigerians. The platform covers rentals, shortlets and office space, digital leasing, an escrow-backed wallet and FirstKey rent savings.",
      "My work spans the Next.js frontend and the NestJS backend. I turn product ideas and Figma designs into production features, and I've redesigned dashboards and user workflows around property discovery, leasing, savings and payments.",
    ],
    highlights: [
      "Property discovery and search with recommendations based on a renter's budget.",
      "Tour booking for scheduling in-person viewings.",
      "Digital leasing workflows from application to signed agreement.",
      "Escrow-protected payments that hold rent until a transaction is confirmed.",
      "A wallet for property payments, and FirstKey savings toward rent goals.",
      "SageAI, an assistant for property search, savings guidance and support.",
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Gemini", "Tailwind CSS", "shadcn/ui"],
    links: {
      live: "https://www.leadsageafrica.com/",
      linkedin: "https://www.linkedin.com/company/leadsage-africa/about/",
    },
    cover: { src: "/images/leadsage-preview.png", alt: "LeadSage Africa home page with property search" },
    gallery: [
      { src: "/images/first-key.png", alt: "FirstKey rent savings in LeadSage" },
      { src: "/images/dashboard.png", alt: "LeadSage renter dashboard" },
      { src: "/images/sagenest.png", alt: "LeadSage SageNest in light mode" },
      { src: "/images/sagenestDark.png", alt: "LeadSage SageNest in dark mode" },
    ],
    spotlights: [
      {
        title: "SageAI: from urgent requirement to resilient product in a week",
        diagram: "sageai-pipeline",
        paragraphs: [
          "LeadSage needed a personalised assistant that could talk to users directly on WhatsApp, and it was urgent. I had one week to design and build the backend.",
          "I built it on NestJS, Gemini, Redis and BullMQ. Incoming messages go onto a queue and a separate worker handles the AI conversation, so slow model calls never hold up the main API. The assistant understands each user's context and helps with property search, rent savings, tours, wallets and payments.",
          "As it grew, I made it resilient. Redis-based debouncing merges rapid-fire messages into one clean turn, transient Gemini failures retry with jittered backoff, and users get a clear message instead of silence when something goes wrong.",
        ],
        screens: [
          { src: "/images/leadsage-chat-1.png", alt: "A SageAI conversation on WhatsApp", width: 2870, height: 1968 },
        ],
      },
    ],
  },
  {
    slug: "next-reel",
    title: "NextReel",
    tagline: "A movie discovery app built on the TMDB API",
    summary:
      "Trailers, cast, reviews and recommendations from several TMDB endpoints, with infinite loading and debounced search.",
    role: "Solo build",
    context: "Personal build",
    overview: [
      "API integration is one of the most important frontend skills, and NextReel is built around it. It pulls trailers, clips, reviews, cast details, ratings and recommendations from the TMDB API to help you decide what to watch next.",
      "The focus was on making a data-heavy app feel fast: infinite queries for smooth loading and caching, a debounced search that avoids wasted requests, and clear loading, error and empty states throughout.",
    ],
    highlights: [
      "Infinite queries with TanStack Query for smooth loading and caching.",
      "Debounced search with loading, error and empty states.",
      "Several TMDB endpoints combined for trailers, cast, reviews, ratings and recommendations.",
      "Client-side routing with route-level error handling.",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "TMDB API"],
    links: {
      live: "https://nextreel-orcin.vercel.app/",
      github: "https://github.com/obasantomi/NextReel.git",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_frontenddevelopment-webdevelopment-activity-7409694136531996673-Cxrb",
    },
    cover: { src: "/images/next-reel.jpg", alt: "NextReel home page with featured movies" },
    gallery: [
      { src: "/images/nextreel-hero.png", alt: "NextReel hero section" },
      { src: "/images/next-reel-home.png", alt: "NextReel home feed" },
      { src: "/images/next-reel-explore.png", alt: "Exploring movies in NextReel" },
      { src: "/images/next-reel-specific.png", alt: "A NextReel movie detail page" },
    ],
    demo: { capId: "19vzhrtm775c87j", title: "NextReel product walkthrough" },
  },
  {
    slug: "korabytes",
    title: "Korabytes",
    tagline: "The Covenant University community for student builders, backed by Kora",
    summary:
      "I lead the Korabytes community, and when it needed a home online fast, I designed and built a clean, modern site with a CMS, publish webhooks and Tally applications.",
    role: "Lead community manager, designed and built the site",
    context: "Korabytes, backed by Kora",
    year: "2026",
    overview: [
      "Korabytes is a community of student founders, creatives and tech enthusiasts at Covenant University, backed by Kora. Whether you're running a small business, launching a startup or just curious about how fintech works, it's a space to learn, grow and get ahead.",
      "I'm the lead community manager. We needed a site before the alpha cohort opened, and there wasn't much time, so I took it on myself: a clean, modern UI, a CMS the exec team can publish from, and an application flow wired into the tools we already use.",
    ],
    highlights: [
      "A modern landing page with its own design system, light and dark themes, and restrained motion that respects reduced-motion settings.",
      "Events and announcements managed in Sanity, with the Studio embedded in the site so editors publish from the same domain.",
      "A signed Sanity webhook that refreshes cached pages the moment a post is published, with an hourly fallback.",
      "Applications through an embedded Tally form, so the exec team reviews submissions where they already work and the site stores no personal data.",
      "Event pages with registration, share links and an add-to-calendar download that marks cancelled events.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Sanity", "Tally", "Vercel"],
    links: {
      live: "https://korabytes.vercel.app/",
      instagram: "https://www.instagram.com/korabytes_cu/",
    },
    cover: {
      src: "/images/korabytes-hero-dark.png",
      alt: "Korabytes landing page in dark mode with the alpha cohort ticket showing 100 spots",
    },
    gallery: [],
    demo: {
      capId: "dtzjpvcg3q8jw9d",
      title: "Korabytes site walkthrough",
    },
    spotlights: [
      {
        title: "A clean, modern UI on a short deadline",
        paragraphs: [
          "The community needed to be live and recruiting within a short window, and the site had to feel like it belonged next to Kora. I didn't want speed to show in the result.",
          "I started with a small design system instead of one-off styles: brand colours as tokens, a type scale across three fonts, one easing curve and one entrance style for every animation. That made the rest of the build fast, because every new section reused the same pieces.",
          "Dark mode keeps the brand rather than inverting it, with a navy night sky and Kora blue as the light source. The theme applies before first paint, so there's no flash, and motion and smooth scrolling switch off for anyone who prefers reduced motion.",
        ],
        screens: [
          {
            src: "/images/korabytes-hero-dark.png",
            alt: "Korabytes hero in dark mode with a navy background and blue glow",
            caption: "The hero in dark mode, with the alpha cohort ticket.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/korabytes-hero-light.png",
            alt: "Korabytes hero in light mode",
            caption: "The same hero in light mode.",
            width: 2000,
            height: 1301,
          },
        ],
      },
      {
        title: "A CMS, webhooks and Tally, coordinated so nobody waits on a developer",
        paragraphs: [
          "Events and announcements change every week and are written by the exec team, not engineers. I integrated Sanity as the CMS and embedded its Studio in the site at /studio, so editors publish from the same domain and nothing else needs hosting. Everything else stays in code, so an editing mistake can't break the layout.",
          "Pages are static and cached, and a signed Sanity webhook keeps them fresh. When a post is published, Sanity calls an API route that verifies the signature and clears the cached posts, so the change is live straight away. If a webhook ever fails, an hourly refresh catches up, and it also moves finished events into Past.",
          "Applications go through an embedded Tally form. The exec team already reviews submissions in Tally, so the site stores no personal data and needs no spam handling. If Tally's script fails, the form still loads, and there's a link to open it in a new tab.",
        ],
        screens: [
          {
            src: "/images/korabytes-events.png",
            alt: "Korabytes events and announcements page with filters and two posts",
            caption: "Events and announcements, published by the exec team from Sanity.",
            width: 2000,
            height: 1301,
          },
          {
            src: "/images/korabytes-event.png",
            alt: "A Korabytes event page with a cover image, date, venue and price",
            caption: "An event page, with registration and an add-to-calendar download.",
            width: 2000,
            height: 1301,
          },
        ],
      },
    ],
  },
  {
    slug: "echo",
    title: "Echo",
    tagline: "A social impact platform that rewards positive action",
    summary:
      "Responsive React interfaces for a platform that helps leaders gather meaningful feedback from their communities.",
    role: "Front-end engineer",
    context: "Echo",
    year: "2025–2026",
    overview: [
      "Echo helps leaders gather meaningful feedback from their followers so they can build stronger communities. Instead of chasing attention, users create waves: helpful actions and ideas that improve their environment.",
      "I built responsive, scalable interfaces with React, TypeScript and Zod, working closely with designers and backend engineers to turn product ideas into polished features.",
    ],
    highlights: [
      "Reusable React components and a scalable frontend architecture.",
      "Community engagement through feedback, discussions and waves.",
      "API state managed with TanStack Query for caching and synchronisation.",
      "Type-safe forms validated with Zod.",
      "Interface motion with Framer Motion.",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Zod", "Framer Motion", "Tailwind CSS", "Recharts"],
    links: {
      live: "https://www.echo-ng.com/",
      linkedin:
        "https://www.linkedin.com/posts/tomilola-obasan_reactjs-frontenddevelopment-socialimpact-activity-7403444990099759104-G_U4",
    },
    cover: { src: "/images/echo-home.jpg", alt: "Echo home page" },
    gallery: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

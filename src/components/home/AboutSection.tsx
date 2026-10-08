import { Container } from "@/components/ui/primitives";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

const principles = [
  {
    title: "Simple, not simplistic",
    body: "I keep solutions as simple as possible without compromising reliability, security or maintainability.",
  },
  {
    title: "Done means production-ready",
    body: "A feature isn't finished when the happy path works. I design for failure states, edge cases and the people who maintain it next.",
  },
  {
    title: "The business comes first",
    body: "I start from the product and its users, then choose the technology. Impressive architecture isn't the goal.",
  },
];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2
              id="about-title"
              className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.03em] text-balance lg:sticky lg:top-28"
            >
              An engineer who owns the whole product.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-pretty text-muted md:text-xl md:leading-relaxed">
              <p>
                I like owning products end to end: the requirements, the design, the frontend and backend, the data,
                and the infrastructure underneath. I want to understand the whole system I&apos;m building, and why it
                should be built that way, not just how to make it work.
              </p>
              <p>
                My background is in Computer Science at {profile.education.school}, and I&apos;ve shipped production
                software in travel, PropTech, fintech and social impact, mostly in TypeScript across React, Next.js,
                Node.js and NestJS.
              </p>
              <p>
                At Tramango I work on a microservices architecture, and I care about what happens after the merge:
                CI/CD workflows, Docker, Kubernetes deployment configuration, and tuning nodes and pods so the product
                stays reliable all day long.
              </p>
              <p>
                I use AI as leverage, not a crutch. I make the decisions and I understand the code I ship. I&apos;m{" "}
                <span className="text-fg">available now</span> and looking for an ambitious team that cares about
                building things properly.
              </p>
            </div>

            <ol className="mt-14 border-t border-line">
              {principles.map((principle) => (
                <li key={principle.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                  <h3 className="font-display text-xl tracking-[-0.01em]">{principle.title}</h3>
                  <p className="leading-relaxed text-pretty text-muted">{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <h3 className="font-display text-2xl tracking-[-0.015em] md:text-3xl">What I work with</h3>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.name} className="border-t border-line pt-4">
                <dt className="text-sm font-medium text-fg">{group.name}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{group.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

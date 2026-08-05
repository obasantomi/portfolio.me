"use client";

interface ProjectToolsProps {
  tech: string[];
}

export function ProjectTools({ tech }: ProjectToolsProps) {
  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Tools
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          A concise overview of the technologies that powered this case study.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {tech.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}

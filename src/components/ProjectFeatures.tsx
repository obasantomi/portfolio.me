"use client";

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <section className="mt-16">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Features
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          What makes this project feel polished, purposeful, and built for real
          users.
        </p>
      </div>

      <div className="mt-4 space-y-6">
        {features.map((feature, index) => (
          <article
            key={`${feature}-${index}`}
            className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
              <p className="text-sm text-slate-900">{feature}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

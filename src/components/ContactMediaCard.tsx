import type { ComponentType } from "react";

interface ContactMediaCardProps {
  href: string;
  label: string;
  text: string;
  Icon: ComponentType<{ className?: string }>;
}

export const ContactMediaCard = ({
  href,
  label,
  text,
  Icon,
}: ContactMediaCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-slate-900" />
    <span className="text-sm text-slate-700">{text}</span>
  </a>
);

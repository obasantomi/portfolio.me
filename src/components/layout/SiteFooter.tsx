"use client";

import { Container } from "@/components/ui/primitives";
import { profile, socialLinks } from "@/data/profile";
import { useLagosTime } from "@/lib/useLagosTime";

export function SiteFooter() {
  const time = useLagosTime();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="tabular-nums">
          {time ? (
            <>
              <span className="text-fg">{time}</span> in Lagos (WAT)
            </>
          ) : (
            "Lagos (WAT)"
          )}
        </p>
      </Container>
    </footer>
  );
}

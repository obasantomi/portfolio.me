import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function SectionHeading({
  id,
  title,
  intro,
  className,
}: {
  id?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", className)}>
      <h2
        id={id}
        className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.03em] text-balance text-fg"
      >
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-pretty text-muted md:text-lg">{intro}</p> : null}
    </div>
  );
}

export function StackList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-xs font-medium text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97]";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/85",
  secondary: "border border-line bg-surface text-fg hover:border-muted/60",
  ghost: "text-muted hover:text-fg",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cx(buttonBase, buttonVariants[variant], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

/** Internal links use next/link; external ones open in a new tab and say so. */
export function ButtonLink({ href, variant = "primary", external, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClass(variant, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <ExternalMark />
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ExternalMark({ className }: { className?: string }) {
  return (
    <>
      <HiArrowUpRight
        aria-hidden
        className={cx(
          "size-3.5 shrink-0 transition-transform duration-200 ease-out group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          className,
        )}
      />
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}

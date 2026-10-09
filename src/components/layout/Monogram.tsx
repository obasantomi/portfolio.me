import { cx } from "@/components/ui/primitives";

/** "TO" initials inside a ring with a resting accent arc. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx("relative grid size-10 place-items-center", className)}>
      <span className="absolute inset-0 rounded-full border border-line" />
      <span className="monogram-orbit absolute inset-0 rounded-full" />
      <span className="font-display text-[15px] leading-none font-bold tracking-[-0.06em] text-fg">TO</span>
    </span>
  );
}

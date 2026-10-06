"use client";

import { HiOutlineClock } from "react-icons/hi2";
import { cx } from "@/components/ui/primitives";
import { useLagosTime } from "@/lib/useLagosTime";

export function LagosTimeNote({ className }: { className?: string }) {
  const time = useLagosTime();

  return (
    <p className={cx("flex items-center gap-2 text-sm text-muted", className)}>
      <HiOutlineClock aria-hidden className="size-4" />
      {time ? (
        <span>
          It&apos;s <span className="text-fg tabular-nums">{time}</span> in Lagos (WAT, UTC+1).
        </span>
      ) : (
        <span>Based in Lagos (WAT, UTC+1).</span>
      )}
    </p>
  );
}

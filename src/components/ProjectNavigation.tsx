"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import SoundToggle from "./SoundToogle";

export function ProjectNavigation() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4  pb-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <FaArrowLeft size={14} />
        </button>
        <Link
          href="/"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          aria-label="Go home"
        >
          <FaHome size={14} />
        </Link>
      </div>

      <SoundToggle />
    </div>
  );
}

"use client";

import { AiOutlineArrowUp } from "react-icons/ai";

export function BackToTop() {
  return (
    <div className="mt-14 flex justify-center pt-10">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs uppercase font-medium text-slate-950 transition duration-200 ease-out transform hover:-translate-y-0.5 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Scroll back to top"
      >
        <AiOutlineArrowUp className="h-4 w-4" />
        BACK TO TOP
      </button>
    </div>
  );
}

"use client";

export function BackToTop() {
  return (
    <div className="mt-14 border-t border-slate-200 pt-10">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
        aria-label="Scroll back to top"
      >
        Back to top ↑
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

interface ProjectMediaGalleryProps {
  project: Project;
}

const zoomInCursor =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='10' cy='10' r='6' stroke='%23212B3D' stroke-width='2' fill='%23ffffff'/%3E%3Cline x1='10' y1='7' x2='10' y2='13' stroke='%23212B3D' stroke-width='2'/%3E%3Cline x1='7' y1='10' x2='13' y2='10' stroke='%23212B3D' stroke-width='2'/%3E%3Cline x1='14.5' y1='14.5' x2='19' y2='19' stroke='%23212B3D' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\") 12 12, zoom-in";
const zoomOutCursor =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='10' cy='10' r='6' stroke='%23212B3D' stroke-width='2' fill='%23ffffff'/%3E%3Cline x1='7' y1='10' x2='13' y2='10' stroke='%23212B3D' stroke-width='2'/%3E%3Cline x1='14.5' y1='14.5' x2='19' y2='19' stroke='%23212B3D' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\") 12 12, zoom-out";

export function ProjectMediaGallery({ project }: ProjectMediaGalleryProps) {
  const images = project.images ?? [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  if (!images.length) {
    return null;
  }

  return (
    <section className="mt-18 space-y-12">
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          A Look Inside
        </p>
      </div>
      {images.map((src, index) => (
        <button
          key={`${src}-${index}`}
          type="button"
          onClick={() => openImage(index)}
          aria-label={`Open ${project.title} screenshot ${index + 1} in lightbox`}
          style={{ cursor: zoomInCursor }}
          className="group w-full overflow-hidden rounded-2xl  p-3 border border-slate-200 bg-white-300 shadow-sm"
        >
          <div className="relative aspect-16/10 w-full overflow-hidde">
            <Image
              src={src}
              alt={`${project.title} screenshot ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </button>
      ))}

      <AnimatePresence>
        {selectedImage !== null ? (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"
              onClick={closeLightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Preview ${project.title} screenshot ${selectedIndex !== null ? selectedIndex + 1 : 1}`}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl p-3 bg-white"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label={`Close preview of ${project.title} screenshot ${selectedIndex !== null ? selectedIndex + 1 : 1}`}
                className="relative aspect-16/10 w-full  overflow-hidden"
                style={{ cursor: zoomOutCursor }}
              >
                <Image
                  src={selectedImage}
                  alt={`${project.title} screenshot ${selectedIndex !== null ? selectedIndex + 1 : 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

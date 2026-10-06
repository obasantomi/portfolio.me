"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HiPlay, HiXMark } from "react-icons/hi2";
import { buttonClass } from "@/components/ui/primitives";
import type { DemoVideo, ImageAsset } from "@/types";

const capEmbedUrl = (capId: string) => `https://cap.so/embed/${capId}`;

function CapFrame({ video }: { video: DemoVideo }) {
  return (
    <iframe
      src={capEmbedUrl(video.capId)}
      title={video.title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 size-full"
    />
  );
}

/**
 * Shows the cover image until the visitor asks for the video, so the
 * third-party player only loads when someone actually wants to watch.
 */
export function CapInlineVideo({ video, poster }: { video: DemoVideo; poster: ImageAsset }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2">
      {isLoaded ? (
        <CapFrame video={video} />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play ${video.title}`}
        >
          <Image
            src={poster.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-80"
          />
          <span className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#141413] shadow-lg transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
              <HiPlay className="size-4" aria-hidden />
              Play the walkthrough
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

/** A trigger button that opens the demo in a native modal dialog. */
export function CapVideoDialogButton({ video, label = "Watch the demo" }: { video: DemoVideo; label?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" onClick={open} className={buttonClass("secondary")}>
        <HiPlay className="size-3.5" aria-hidden />
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={video.title}
        data-lenis-prevent
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          // Clicks on the backdrop land on the dialog element itself.
          if (event.target === event.currentTarget) close();
        }}
        className="video-dialog m-auto w-[min(1100px,calc(100vw-2rem))] overflow-visible bg-transparent p-0"
      >
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <p className="text-sm font-medium">{video.title}</p>
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <HiXMark className="size-5" />
          </button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          {isOpen ? <CapFrame video={video} /> : null}
        </div>
      </dialog>
    </>
  );
}

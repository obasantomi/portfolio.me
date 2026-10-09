"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cx } from "@/components/ui/primitives";
import { mediaReveal, mediaSettle } from "@/lib/motion";
import type { ImageAsset } from "@/types";

// Waits until a good part of the frame is on screen, so the visitor sees the whole reveal.
const revealViewport = { once: true, amount: 0.3 } as const;

const frameClass = "relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2";

/**
 * Product screenshot in a rounded frame. With `reveal`, it wipes in and settles
 * the first time it scrolls into view; only the landing page asks for that.
 */
export function RevealImage({
  image,
  sizes,
  priority,
  reveal = false,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  reveal?: boolean;
  className?: string;
}) {
  const picture = <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />;

  if (!reveal) return <div className={cx(frameClass, className)}>{picture}</div>;

  // The unclipped wrapper watches the viewport: browsers count a fully
  // clipped element as invisible, so the frame could never trigger itself.
  // Reduced motion skips the wipe in CSS (.media-reveal), from the first paint.
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={revealViewport}>
      <motion.div
        variants={mediaReveal}
        className={cx("media-reveal", frameClass, className)}
      >
        <motion.div variants={mediaSettle} className="media-settle absolute inset-0">
          {picture}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

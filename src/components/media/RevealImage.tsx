"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cx } from "@/components/ui/primitives";
import { inViewOnce, mediaReveal, mediaSettle } from "@/lib/motion";
import type { ImageAsset } from "@/types";

/** Product screenshot that wipes in and settles the first time it scrolls into view. */
export function RevealImage({
  image,
  sizes,
  priority,
  className,
}: {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={mediaReveal}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      className={cx("relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2", className)}
    >
      <motion.div variants={mediaSettle} className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </motion.div>
    </motion.div>
  );
}

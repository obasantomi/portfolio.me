"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const SPACING = 26;
const BASE_RADIUS = 0.9;
const LENS_RADIUS = 190;
const LENS_GROWTH = 1.7;
const PUSH = 7;

function readColor(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16)).join(" ");
}

/**
 * A quiet field of dots behind the hero. A slow wave drifts across it, and the
 * cursor acts as a lens that lifts nearby dots into the accent colour.
 * Pauses when off-screen or hidden, and renders a still frame for reduced motion.
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let isVisible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    const eased = { x: -9999, y: -9999, strength: 0 };
    let colors = { dot: "", accent: "" };

    const updateColors = () => {
      colors = { dot: hexToRgb(readColor("--muted")), accent: hexToRgb(readColor("--accent")) };
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;
      eased.strength += ((pointer.active ? 1 : 0) - eased.strength) * 0.08;

      const t = time / 1000;
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          const wave = reduceMotion ? 0.5 : (Math.sin(x * 0.006 + y * 0.004 - t * 0.6) + 1) / 2;
          const dx = x - eased.x;
          const dy = y - eased.y;
          const distance = Math.hypot(dx, dy);
          const lens = Math.max(0, 1 - distance / LENS_RADIUS) * eased.strength;
          const falloff = lens * lens;

          const offset = distance > 0 ? (falloff * PUSH) / distance : 0;
          const px = x + dx * offset;
          const py = y + dy * offset;
          const radius = BASE_RADIUS + falloff * LENS_GROWTH + wave * 0.35;

          context.beginPath();
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fillStyle =
            falloff > 0.02
              ? `rgb(${colors.accent} / ${0.25 + falloff * 0.75})`
              : `rgb(${colors.dot} / ${0.14 + wave * 0.16})`;
          context.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) {
        draw(0);
      } else if (isVisible && !document.hidden) {
        frame = requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = pointer.y >= 0 && pointer.y <= bounds.height;
      if (eased.x < -1000) {
        eased.x = pointer.x;
        eased.y = pointer.y;
      }
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      start();
    });
    const themeObserver = new MutationObserver(() => {
      updateColors();
      if (reduceMotion) draw(0);
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });

    updateColors();
    resize();
    start();
    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", start);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_30%,transparent_85%)]"
    />
  );
}

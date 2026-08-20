"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  HiArrowsPointingOut,
  HiPause,
  HiPlay,
  HiSpeakerWave,
  HiSpeakerXMark,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motion";

interface ProjectDemoVideoProps {
  videoSrc: string;
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ProjectDemoVideo({ videoSrc }: ProjectDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const volumeId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration ?? 0);
      setCurrentTime(video.currentTime ?? 0);
      setMuted(video.muted);
      setVolume(video.volume ?? 1);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
      return;
    }

    video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = !video.muted;
    setMuted(video.muted);
    setVolume(video.muted ? 0 : video.volume);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  };

  const handleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.requestFullscreen) {
      await video.requestFullscreen();
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className="mt-10"
    >
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-600">
        Demo video
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950/5">
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            onClick={togglePlay}
            playsInline
          />
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                {isPlaying ? <HiPause size={18} /> : <HiPlay size={18} />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute demo video" : "Mute demo video"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
              >
                {muted || volume === 0 ? (
                  <HiSpeakerXMark size={18} />
                ) : (
                  <HiSpeakerWave size={18} />
                )}
              </button>

              <div className="hidden items-center gap-3 text-sm text-slate-600 sm:flex">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Open video fullscreen"
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-slate-900 transition hover:border-slate-300 hover:bg-slate-100"
            >
              <HiArrowsPointingOut size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600 sm:hidden">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              aria-label="Seek video"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(event) => handleSeek(Number(event.target.value))}
              className="h-1 w-full cursor-pointer accent-slate-900"
            />

            <div className="flex items-center gap-3">
              <label
                htmlFor={`volume-${volumeId}`}
                className="text-sm font-medium text-slate-600"
              >
                Volume
              </label>
              <input
                id={`volume-${volumeId}`}
                aria-label="Adjust volume"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(event) =>
                  handleVolumeChange(Number(event.target.value))
                }
                className="h-1 w-full cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

interface BackgroundAudioProps {
  src: string;
  loop?: boolean;
}

export default function BackgroundAudio({
  src,
  loop = true,
}: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volumeLevel, setVolumeLevel] = useState<0 | 1 | 2>(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const volumeMap = [0, 0.5, 1];

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = volumeMap[volumeLevel];

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [volumeLevel]);

  const cycleVolume = () => {
    const next = volumeLevel === 2 ? 0 : ((volumeLevel + 1) as 0 | 1 | 2);
    setVolumeLevel(next);

    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const VolumeIcon =
    volumeLevel === 0
      ? FaVolumeMute
      : volumeLevel === 1
        ? FaVolumeDown
        : FaVolumeUp;

  return (
    <>
      <audio ref={audioRef} src={src} loop={loop} hidden />
      <button
        type="button"
        onClick={cycleVolume}
        className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
        aria-label="Cycle audio volume"
      >
        <VolumeIcon className="h-5 w-5" />
      </button>
    </>
  );
}

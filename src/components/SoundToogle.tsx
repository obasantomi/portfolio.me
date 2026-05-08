"use client";

import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { useAudio } from "@/context/AudioContext";

export default function SoundToggle() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      className="
        group
        flex
        items-center
        justify-center
        rounded-full
        bg-[#efefef]
        px-3
        py-2
        transition-all
        duration-300
        hover:bg-[#e5e5e5]
        active:scale-95
      "
    >
      {!isPlaying ? (
        <HiSpeakerXMark
          size={14}
          className="
            text-[#2d2d2d]
            transition-colors
            duration-300
            group-hover:text-black
          "
        />
      ) : (
        <HiSpeakerWave
          size={14}
          className="
            text-[#2d2d2d]
            transition-colors
            duration-300
            group-hover:text-black
          "
        />
      )}
    </button>
  );
}

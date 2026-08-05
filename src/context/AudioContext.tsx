"use client";

import { createContext, useContext, useRef, useState, useEffect } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volumeLevel: 0 | 1;
  setVolumeLevel: (level: 0 | 1) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState<0 | 1>(0);

  const volumeMap = [0, 1];

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setVolumeLevel(1);
        })
        .catch(() => {
          setIsPlaying(false);
          setVolumeLevel(0);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeMap[volumeLevel];
  }, [volumeLevel]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        audioRef,
        volumeLevel,
        setVolumeLevel,
      }}
    >
      <audio
        ref={audioRef}
        src="
https://www.odunsi.xyz/assets/audio/background-music.mp3"
        loop
        autoPlay
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

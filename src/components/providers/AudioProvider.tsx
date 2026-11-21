"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const MUSIC_URL = "/audio/background-music.mp3";
const TAP_SOUND_URL = "/audio/tap.wav";
const THEME_SOUND_URLS = {
  light: "/audio/theme-light.m4a?v=2",
  dark: "/audio/theme-dark.m4a?v=2",
} as const;

const MUSIC_VOLUME = 0.55;
const TAP_VOLUME = 0.6;
/** A single soft tick, kept below the tap so it never draws attention. */
const THEME_VOLUME = 0.28;
const ACTIONABLE_SELECTOR =
  'button, a[href], [role="button"], input[type="button"], input[type="submit"], select, [data-tap-sound]';

export type ThemeSound = keyof typeof THEME_SOUND_URLS;

interface AudioContextValue {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  /** Plays the soft tick for a theme change: a touch brighter into light, lower into dark. */
  playThemeSound: (theme: ThemeSound) => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const tapRef = useRef<HTMLAudioElement | null>(null);
  const themeSoundsRef = useRef<Partial<Record<ThemeSound, HTMLAudioElement>>>({});
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync state from the element's own events so the toggle never lies,
  // whatever started or stopped playback.
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;

    music.volume = MUSIC_VOLUME;
    const handlePlay = () => setIsMusicPlaying(true);
    const handlePause = () => setIsMusicPlaying(false);
    music.addEventListener("play", handlePlay);
    music.addEventListener("pause", handlePause);

    return () => {
      music.removeEventListener("play", handlePlay);
      music.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const tap = new Audio(TAP_SOUND_URL);
    tap.preload = "auto";
    tap.volume = TAP_VOLUME;
    tapRef.current = tap;

    const handleTap = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const actionable = target?.closest<HTMLElement>(ACTIONABLE_SELECTOR);
      if (!actionable || actionable.hasAttribute("disabled")) return;
      // Controls with their own sound (the theme toggle) opt out of the tap.
      if (actionable.dataset.tapSound === "off") return;

      // Clone so quick successive taps overlap instead of cutting each other off.
      const sound = tap.cloneNode() as HTMLAudioElement;
      sound.volume = TAP_VOLUME;
      sound.play().catch(() => {});
    };

    document.addEventListener("click", handleTap, true);
    return () => document.removeEventListener("click", handleTap, true);
  }, []);

  // Preload both ticks so the first switch plays without a delay.
  useEffect(() => {
    for (const [theme, url] of Object.entries(THEME_SOUND_URLS) as [ThemeSound, string][]) {
      const sound = new Audio(url);
      sound.preload = "auto";
      sound.volume = THEME_VOLUME;
      themeSoundsRef.current[theme] = sound;
    }
  }, []);

  const playThemeSound = useCallback((theme: ThemeSound) => {
    const source = themeSoundsRef.current[theme];
    if (!source) return;
    // Clone so a quick double switch layers instead of cutting off.
    const sound = source.cloneNode() as HTMLAudioElement;
    sound.volume = THEME_VOLUME;
    sound.play().catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) return;

    if (music.paused) {
      music.play().catch(() => setIsMusicPlaying(false));
    } else {
      music.pause();
    }
  }, []);

  return (
    <AudioContext.Provider value={{ isMusicPlaying, toggleMusic, playThemeSound }}>
      <audio ref={musicRef} src={MUSIC_URL} loop preload="none" />
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

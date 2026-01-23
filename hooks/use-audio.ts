"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";

export function useAudio(audioUrls: string[]) {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Memoize the urls to prevent unnecessary effect runs
  const urlsKey = audioUrls.join(",");

  useEffect(() => {
    // Preload all audio files
    audioUrls.forEach((url) => {
      if (!audioCache.current.has(url)) {
        const audio = new Audio(url);
        audio.preload = "auto";
        audioCache.current.set(url, audio);
      }
    });

    return () => {
      audioCache.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioCache.current.clear();
    };
  }, [urlsKey]);

  const play = useCallback((url: string) => {
    const audio = audioCache.current.get(url);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Handle autoplay restrictions silently
      });
    }
  }, []);

  return { play };
}

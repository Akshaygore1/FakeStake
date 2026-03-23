"use client";

import { useRef, useEffect, useCallback } from "react";

export function useAudio(audioUrls: string[]) {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const cache = audioCache.current;

    audioUrls.forEach((url) => {
      if (!cache.has(url)) {
        const audio = new Audio(url);
        audio.preload = "auto";
        cache.set(url, audio);
      }
    });

    return () => {
      cache.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      cache.clear();
    };
  }, [audioUrls]);

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

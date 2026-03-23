"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Initialize with undefined to avoid SSR hydration mismatch
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const media = window.matchMedia(query);
    // Set initial value on mount
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  // Return false as default for SSR, actual value after hydration
  return matches ?? false;
}

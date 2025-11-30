"use client";

import { useEffect, useRef } from "react";

interface BannerProps {
  height?: number;
  width?: number;
}

export default function Banner({
  height = 50,
  width = 320,
}: BannerProps): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const additionalScript = document.createElement("script");

      additionalScript.type = "text/javascript";

      additionalScript.src =
        "//pl28161075.effectivegatecpm.com/f6/3c/a2/f63ca2e0de4ec90d0880c12b7daee363.js";

      banner.current.append(additionalScript);
    }
  }, []);

  return <div ref={banner}></div>;
}

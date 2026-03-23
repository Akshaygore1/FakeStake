"use client";

import { lazy, Suspense } from "react";

const MeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.MeshGradient,
  }))
);

interface MeshGradientBackgroundProps {
  colors?: [string, string, string, string];
  speed?: number;
  className?: string;
}

export default function MeshGradientBackground({
  colors = ["#000000", "#5cf673", "#000000", "#000000"],
  speed = 1,
  className = "absolute inset-0 w-full h-full",
}: MeshGradientBackgroundProps) {
  return (
    <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-black" />}>
      <MeshGradient className={className} colors={colors} speed={speed} />
    </Suspense>
  );
}

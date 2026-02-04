"use client";

import dynamic from "next/dynamic";

// Dynamic import for heavy shader library - only loads when needed
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 w-full h-full bg-black" />,
  }
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
  return <MeshGradient className={className} colors={colors} speed={speed} />;
}

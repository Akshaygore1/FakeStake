import React from "react";
import { cn } from "@/lib/utils";

interface GameContainerProps {
  configComponent: React.ReactNode;
  gameComponent: React.ReactNode;
  className?: string;
}

export default function GameContainer({
  configComponent,
  gameComponent,
  className = "",
}: GameContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col gap-4 bg-background p-4 md:flex-row md:gap-8",
        className
      )}
    >
      <div className="w-full md:w-1/3 bg-primary">{configComponent}</div>
      <div className="w-full md:w-2/3">{gameComponent}</div>
    </div>
  );
}

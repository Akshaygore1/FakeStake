import React from "react";

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
      className={`flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto ${className}`}
    >
      <div className="w-full md:w-1/3 bg-primary">{configComponent}</div>
      <div className="w-full md:w-2/3">{gameComponent}</div>
    </div>
  );
}

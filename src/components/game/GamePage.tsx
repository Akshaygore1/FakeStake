import React from "react";
import { cn } from "@/lib/utils";

interface GamePageProps {
  children: React.ReactNode;
  className?: string;
}

export default function GamePage({ children, className = "" }: GamePageProps) {
  return (
    <main className={cn("flex min-h-[calc(100vh-80px)] flex-col", className)}>
      <div className="flex flex-col lg:flex-row w-full flex-1">
        <div className="flex justify-center items-center w-full p-4">
          {children}
        </div>
      </div>
    </main>
  );
}

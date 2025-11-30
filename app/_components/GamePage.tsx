import React from "react";
import Banner from "./AdBanner";

interface GamePageProps {
  children: React.ReactNode;
  className?: string;
}

export default function GamePage({ children, className = "" }: GamePageProps) {
  return (
    <main className={`flex flex-col min-h-[calc(100vh-80px)] ${className}`}>
      <div className="flex flex-col lg:flex-row w-full flex-1">
        <div className="flex justify-center items-center w-full p-4">
          {children}
        </div>
      </div>
      <div className="flex justify-center p-4">
        <Banner width={800} height={200} />
      </div>
    </main>
  );
}

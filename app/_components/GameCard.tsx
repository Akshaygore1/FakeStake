import Link from "next/link";
import React, { useState, ReactNode } from "react";

type GameCardProps = {
  link: string;
  logo: ReactNode;
  name: string;
};

export default function GameCard({ link, logo, name }: GameCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link
      href={link}
      className={`max-w-xs rounded overflow-hidden shadow-lg min-w-52 bg-gray-800 hover:scale-105 transition-transform duration-200 ${
        name === "Coming Soon"
          ? {}
          : "hover:text-[#00ff62]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`w-full flex justify-center items-center h-48 bg-gray-700 ${
          hovered ? "bg-inherit" : null
        }`}
      >
        {React.cloneElement(
          logo as React.ReactElement<any>,
          name === "Coming Soon"
            ? {
                color: "#a4a7a5",
              }
            : {
                color: hovered ? "#00ff62" : "#fff",
              }
        )}
      </div>
      <div className="px-6 py-4">
        {name === "Coming Soon" ? (
          <>
            <div className="font-bold text-xl mb-1 text-[#a4a7a5]">{name}</div>
            <p className="text-[#a4a7a5] italic">Stay tuned!</p>
          </>
        ) : (
          <>
            <div className="font-bold text-xl mb-1">{name}</div>
            <p className=" text-gray-300 italic">Click to play {name}</p>
          </>
        )}
      </div>
    </Link>
  );
}

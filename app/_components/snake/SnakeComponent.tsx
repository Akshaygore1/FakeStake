"use client";
import { useSnakeStore } from "@/store/snakeStore";
import { Play, Trophy } from "lucide-react";
import { useState } from "react";

// Grid data: position -> content
const gridData = [
  { type: "play" },
  { type: "multiplier", value: "2.00x", active: true },
  { type: "multiplier", value: "1.30x" },
  { type: "multiplier", value: "1.20x" },
  { type: "multiplier", value: "2.00x" },
  { type: "dice" },
  { type: "dice" },
  { type: "multiplier", value: "1.10x" },
  { type: "multiplier", value: "1.30x" },
  { type: "dice" },
  { type: "dice" },
  { type: "multiplier", value: "1.01x" },
  { type: "multiplier", value: "1.20x" },
  { type: "multiplier", value: "1.10x" },
  { type: "multiplier", value: "1.01x" },
  { type: "trophy" },
];

// Dice component that shows specific number of dots
const Dice = ({ value }: { value: number }) => {
  const dotPositions: { [key: number]: number[] } = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };

  const dots = dotPositions[value] || [];

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-lg flex items-center justify-center relative">
      {/* Inner shadow effect */}
      <div className="absolute inset-1 rounded-md bg-gradient-to-b from-white to-gray-200"></div>
      <div className="relative grid grid-cols-3 gap-1 p-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
          <div
            key={pos}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
              dots.includes(pos) ? "bg-gray-800" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

function SnakeComponent() {
  const { isPlaying } = useSnakeStore();
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentMultiplier] = useState("2.00x");

  const renderTile = (item: (typeof gridData)[0], index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;

    // Center area for dice display
    const isCenter = (row === 1 || row === 2) && (col === 1 || col === 2);

    if (isCenter) {
      return null;
    }

    const isActive = index === activeIndex;
    const isPlay = item.type === "play";
    const isTrophy = item.type === "trophy";

    return (
      <div
        key={index}
        className={`
          w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
          rounded-xl cursor-pointer
          transition-all duration-300
          flex items-center justify-center
          ${
            isActive
              ? isPlay
                ? "bg-gradient-to-b from-gray-500 to-gray-600 shadow-lg shadow-gray-500/30"
                : isTrophy
                ? "bg-gradient-to-b from-red-500 to-red-600 shadow-lg shadow-red-500/30"
                : "bg-gradient-to-b from-green-400 to-green-500 shadow-lg shadow-cyan-500/30"
              : "bg-[#3d4a5c] hover:bg-[#4a5a6e]"
          }
        `}
        style={{
          gridRow: row + 1,
          gridColumn: col + 1,
        }}
        onClick={() => setActiveIndex(index)}
      >
        {isPlay && (
          <Play
            className={`w-8 h-8 md:w-10 md:h-10 ${
              isActive ? "text-white" : "text-slate-400"
            }`}
            fill="currentColor"
          />
        )}
        {isTrophy && (
          <div className="w-full h-full flex items-center justify-center">
            <img src="/assets/snake.svg" alt="trophy" />
          </div>
        )}
        {item.type === "multiplier" && (
          <span
            className={`font-bold text-lg md:text-xl ${
              isActive ? "text-white" : "text-slate-300"
            }`}
          >
            {item.value}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full aspect-square bg-[#1a2332] rounded-2xl p-4 md:p-6 lg:p-8 flex items-center justify-center">
      {/* Grid container */}
      <div className="relative">
        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-1 md:gap-2">
          {gridData.map((item, index) => renderTile(item, index))}
        </div>

        {/* Center dice area */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#2d3a4d] rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 border border-slate-600/30">
            {/* Dice row */}
            <div className="flex gap-2">
              <Dice value={5} />
              <Dice value={1} />
            </div>
            {/* Multiplier display */}
            <div className="bg-[#1a2332] w-full text-center rounded-lg px-6 py-2 border border-slate-600/50">
              <span className="text-green-400 font-bold text-xl md:text-2xl">
                {currentMultiplier}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnakeComponent;

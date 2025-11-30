/* eslint-disable @next/next/no-img-element */
"use client";

import { useDragonStore } from "@/app/_store/dragonStore";

export default function DragonComponent() {
  const {
    difficulty,
    isPlaying,
    currentRow,
    skullPositions,
    revealedCells,
    revealCell,
  } = useDragonStore();

  const rows = 9;
  const cols = difficulty === "easy" ? 4 : difficulty === "medium" ? 3 : 2;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!isPlaying) return;
    if (rowIndex !== currentRow) return;
    revealCell(rowIndex, colIndex);
  };

  const getCellContent = (rowIndex: number, colIndex: number) => {
    const isRevealed = revealedCells[rowIndex]?.[colIndex];
    const isSkull = skullPositions[rowIndex] === colIndex;
    const isCurrentRow = rowIndex === currentRow;

    if (isRevealed) {
      return isSkull ? (
        <img
          src="/assets/skull.svg"
          alt="skull"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-bounce"
        />
      ) : (
        <img
          src="/assets/egg.svg"
          alt="egg"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
        />
      );
    }

    if (isPlaying && isCurrentRow) {
      return "";
    }

    return "";
  };

  const getCellStyle = (rowIndex: number, colIndex: number) => {
    const isRevealed = revealedCells[rowIndex]?.[colIndex];
    const isSkull = skullPositions[rowIndex] === colIndex;
    const isCurrentRow = rowIndex === currentRow;

    if (isRevealed) {
      return isSkull
        ? "bg-red-700 cursor-default"
        : "border-2 border-[#56687A] cursor-default";
    }

    if (isPlaying && isCurrentRow) {
      return "bg-green-600 hover:bg-amber-500 cursor-pointer";
    }

    return "bg-[#213743] cursor-not-allowed";
  };

  return (
    <div className="flex justify-center h-full items-center px-2 sm:px-4">
      <div className="flex justify-center flex-col items-center w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]">
        <div className="relative flex justify-center items-center w-full">
          <img src="/assets/top.svg" className="w-full" />
          <img
            src="/assets/dragon.svg"
            className="absolute top-1/2 -translate-y-1/2 w-16"
          />
        </div>
        <div className="flex flex-col w-full gap-1 sm:gap-2 p-2 sm:p-4 rounded-b-lg border-8 border-[#56687A]">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 sm:gap-2 justify-center">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`h-8 sm:h-10 md:h-12 flex-1 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl transition-all ${getCellStyle(
                    rowIndex,
                    colIndex
                  )}`}
                >
                  {getCellContent(rowIndex, colIndex)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

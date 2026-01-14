"use client";
import { useSnakeStore } from "@/store/snakeStore";
import { Play } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  gridData,
  type GridItem,
  PATH_INDICES,
  CENTER_POSITIONS,
  getGridIndexFromPathIndex,
} from "./snakeUtils";

// Animated Dice component
const Dice = ({ value, isRolling }: { value: number; isRolling: boolean }) => {
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
    <motion.div
      className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg shadow-lg flex items-center justify-center relative"
      // animate={
      //   isRolling
      //     ? {
      //         x: [0, -2, 2, -1, 1, 0],
      //         scale: [1, 1.05, 1],
      //       }
      //     : { x: 0, scale: 1 }
      // }
      transition={{
        duration: 0.15,
        repeat: isRolling ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {/* Inner shadow effect */}
      <div className="absolute inset-1 rounded-md bg-gradient-to-b from-white to-gray-200"></div>
      <div className="relative grid grid-cols-3 gap-1 p-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
          <motion.div
            key={pos}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
              dots.includes(pos) ? "bg-gray-800" : "bg-transparent"
            }`}
            animate={
              isRolling
                ? dots.includes(pos)
                  ? {
                      rotate: [0, 180, 360],
                      opacity: [1, 0.7, 1],
                    }
                  : {
                      opacity: [0, 0.3, 0],
                    }
                : dots.includes(pos)
                ? { scale: 1, rotate: 0, opacity: 1 }
                : { scale: 1, rotate: 0, opacity: 0 }
            }
            transition={{
              duration: isRolling ? 0.1 : 0.2,
              repeat: isRolling ? Infinity : 0,
              ease: isRolling ? "linear" : "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

function SnakeComponent() {
  const {
    isPlaying,
    difficulty,
    currentPathIndex,
    pathHistory,
    diceValues,
    isRolling,
    gameOver,
    hasWon,
    currentMultiplier,
  } = useSnakeStore();

  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Get current grid index from path index
  const currentGridIndex = useMemo(
    () => getGridIndexFromPathIndex(currentPathIndex),
    [currentPathIndex]
  );

  // Get all visited grid indices
  const visitedGridIndices = useMemo(() => {
    return pathHistory.map((pathIdx) => getGridIndexFromPathIndex(pathIdx));
  }, [pathHistory]);

  const renderTile = (item: GridItem, index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;

    // Center area for dice display
    const isCenter = CENTER_POSITIONS.includes(index);

    if (isCenter) {
      return null;
    }

    const isCurrentPosition = index === currentGridIndex && isPlaying;
    const isVisited =
      visitedGridIndices.includes(index) && !isCurrentPosition && isPlaying;
    const isPlay = item.type === "play";
    const isSnake = item.type === "snake";
    const isOnPath = PATH_INDICES.includes(index);

    // Determine tile styling based on state
    const getTileStyles = () => {
      if (gameOver && isCurrentPosition) {
        if (hasWon) {
          return "bg-gradient-to-b from-green-400 to-green-600 shadow-lg shadow-green-500/50";
        }
        if (isSnake) {
          return "bg-gradient-to-b from-red-500 to-red-700 shadow-lg shadow-red-500/50";
        }
      }

      if (isCurrentPosition) {
        if (isPlay) {
          return "bg-gradient-to-b from-amber-400 to-amber-600 shadow-lg shadow-amber-500/40";
        }
        if (isSnake) {
          return "bg-gradient-to-b from-red-500 to-red-600 shadow-lg shadow-red-500/30";
        }
        return "bg-gradient-to-b from-green-400 to-green-500 shadow-lg shadow-green-500/40";
      }

      if (isVisited) {
        return "bg-gradient-to-b from-slate-500 to-slate-600 opacity-70";
      }

      return "bg-[#3d4a5c] hover:bg-[#4a5a6e]";
    };

    return (
      <motion.div
        key={index}
        ref={(el) => {
          tileRefs.current[index] = el;
        }}
        className={`
          w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
          rounded-xl
          transition-colors duration-300
          flex items-center justify-center
          relative
          ${getTileStyles()}
          ${!isOnPath ? "opacity-40" : ""}
        `}
        style={{
          gridRow: row + 1,
          gridColumn: col + 1,
        }}
      >
        {isPlay && (
          <Play
            className={`w-8 h-8 md:w-10 md:h-10 ${
              isCurrentPosition ? "text-white" : "text-slate-400"
            }`}
            fill="currentColor"
          />
        )}
        {isSnake && (
          <div className="w-full h-full flex items-center justify-center p-2">
            <img
              src="/assets/snake.svg"
              alt="snake"
              className="w-10 h-10 object-contain"
            />
          </div>
        )}
        {item.type === "multiplier" && (
          <span
            className={`font-bold text-lg md:text-xl ${
              isCurrentPosition
                ? "text-white"
                : isVisited
                ? "text-slate-400"
                : "text-slate-300"
            }`}
          >
            {item.value}
          </span>
        )}

        {/* Visited checkmark */}
        {isVisited && !isPlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl"></div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full aspect-square bg-[#1a2332] rounded-2xl p-4 md:p-6 lg:p-8 flex items-center justify-center">
      {/* Grid container */}
      <div className="relative" ref={gridRef}>
        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-1 md:gap-2">
          {gridData[difficulty].map((item, index) => renderTile(item, index))}
        </div>

        {/* Center dice area */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="bg-[#2d3a4d] rounded-xl p-3 md:p-4 flex flex-col items-center gap-2 border border-slate-600/30"
            transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
          >
            {/* Dice row */}
            <div className="flex gap-2">
              <Dice value={diceValues[0]} isRolling={isRolling} />
              <Dice value={diceValues[1]} isRolling={isRolling} />
            </div>

            {/* Sum display */}
            <motion.div className="bg-black w-full text-center rounded-lg px-6 py-2 border border-slate-600/50">
              {gameOver ? (
                <motion.span
                  className={`font-bold text-xl  md:text-2xl ${
                    hasWon ? "text-green-400" : "text-red-400"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {hasWon ? `Won ${currentMultiplier.toFixed(2)}x!` : "1.00x"}
                </motion.span>
              ) : isPlaying ? (
                <span className="text-green-400 font-bold text-xl md:text-2xl">
                  {currentMultiplier.toFixed(2)}x
                </span>
              ) : (
                <span className="text-slate-200 font-bold text-xl md:text-2xl">
                  1.00x
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SnakeComponent;

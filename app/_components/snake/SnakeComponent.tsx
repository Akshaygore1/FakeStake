"use client";
import { useSnakeStore } from "@/store/snakeStore";

function SnakeComponent() {
  const { isPlaying, score, gameOver, highScore, difficulty } = useSnakeStore();

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-orange-400";
      case "expert":
        return "text-red-400";
      case "master":
        return "text-purple-400";
      default:
        return "text-white";
    }
  };

  // Positions for 12 squares forming a hollow square (clockwise from top-left)
  // Top row: 4 squares, Right side: 2 squares, Bottom row: 4 squares, Left side: 2 squares
  const squarePositions = [
    // Top row (left to right): positions 1-4
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    // Right side (top to bottom): positions 5-6
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    // Bottom row (right to left): positions 7-10
    { row: 3, col: 3 },
    { row: 3, col: 2 },
    { row: 3, col: 1 },
    { row: 3, col: 0 },
    // Left side (bottom to top): positions 11-12
    { row: 2, col: 0 },
    { row: 1, col: 0 },
  ];

  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-3 md:p-6 lg:p-8 flex items-center justify-center">
      {/* Square frame container */}
      <div className="relative">
        {/* Grid for hollow square */}
        <div className="grid grid-cols-4 gap-1 md:gap-1 lg:gap-2">
          {Array.from({ length: 16 }).map((_, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;

            // Check if this position is part of the hollow square frame
            const positionIndex = squarePositions.findIndex(
              (p) => p.row === row && p.col === col
            );
            const isFramePosition = positionIndex !== -1;

            // Check if this is the center (hollow part)
            const isCenter =
              (row === 1 || row === 2) && (col === 1 || col === 2);

            if (isCenter) {
              return null; // Will render dice separately
            }

            if (!isFramePosition) {
              return null;
            }

            return (
              <div
                key={index}
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg shadow-lg border border-gray-500/30 hover:from-gray-500 hover:to-gray-600 transition-all duration-300 cursor-pointer"
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-lg">
                  {positionIndex + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Two dice in the hollow center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 md:gap-3">
          {/* Dice 1 */}
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-white to-gray-200 rounded-xl shadow-2xl border-2 border-gray-300 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5 md:gap-1 p-1.5 md:p-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Dice 2 */}
          <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-white to-gray-200 rounded-xl shadow-2xl border-2 border-gray-300 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5 md:gap-1 p-1.5 md:p-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnakeComponent;

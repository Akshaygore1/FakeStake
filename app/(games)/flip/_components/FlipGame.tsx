"use client";

import { useFlipStore } from "@/stores/game/flip.store";
import { useEffect, useRef, useState } from "react";

export default function FlipGame() {
  const { result, selectedSide, outcome, isFlipping } = useFlipStore();

  const [showResult, setShowResult] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [finalRotation, setFinalRotation] = useState(0);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (isFlipping && result) {
      setShowResult(false);
      setResetting(true);
      setRotation(0);

      setTimeout(() => {
        setResetting(false);
        const fullSpins = 5;
        const final = result === "tails" ? 180 : 0;
        const newRotation = 360 * fullSpins + final;
        setRotation(newRotation);
        setFinalRotation(newRotation);
      }, 20);
    }
  }, [isFlipping, result]);

  useEffect(() => {
    if (!isFlipping && result && outcome) {
      // Show result after animation completes
      const timer = setTimeout(() => setShowResult(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isFlipping, result, outcome]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 md:p-16 gap-8">
      <div className="relative" style={{ perspective: "1000px" }}>
        <div
          className="w-64 h-64 md:w-80 md:h-80 relative"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${
              isFlipping
                ? rotation
                : finalRotation || (selectedSide === "tails" ? 180 : 0)
            }deg)`,
            transition: resetting
              ? "none"
              : "transform 2s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          {/* Heads */}
          <div
            className="absolute inset-0 w-full h-full bg-orange-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-700"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 bg-background rounded-full flex items-center justify-center font-bold text-2xl md:text-4xl text-orange-600"></div>
          </div>

          {/* Tails */}
          <div
            className="absolute inset-0 w-full h-full bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-700"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-40 h-40 md:w-48 md:h-48 bg-background rotate-45 flex items-center justify-center">
              <span className="-rotate-45 font-bold text-2xl md:text-4xl text-blue-600"></span>
            </div>
          </div>
        </div>
      </div>

      {showResult && outcome && (
        <div className="text-center animate-fade-in">
          <p className="text-xl md:text-2xl text-white font-bold mb-2">
            Result: <span className="uppercase ">{result}</span>
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-2">
            You chose: <span className="uppercase">{selectedSide}</span>
          </p>
          <p
            className={`text-lg md:text-xl font-bold ${
              outcome === "win" ? "text-green-500" : "text-red-500"
            }`}
          >
            You {outcome === "win" ? "Won!" : "Lost!"}
          </p>
        </div>
      )}
    </div>
  );
}

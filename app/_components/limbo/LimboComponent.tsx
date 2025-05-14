"use client";
import { useState, useEffect } from "react";

function LimboComponent({
  isRolling,
  displayMultiplier,
  setIsRolling,
  setDisplayMultiplier,
}: {
  isRolling: boolean;
  displayMultiplier: number;
  setIsRolling: (value: boolean) => void;
  setDisplayMultiplier: (value: number) => void;
}) {
  // We'll use a separate state for the animated value
  const [animatedMultiplier, setAnimatedMultiplier] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRolling) {
      // Reset the animated value when rolling starts
      setAnimatedMultiplier(0);

      // Define how quickly the number animates
      const animationSpeed = 50; // milliseconds
      const incrementAmount = 1.05; // How much to add each interval

      intervalId = setInterval(() => {
        setAnimatedMultiplier((prevMultiplier) => {
          const nextMultiplier = prevMultiplier + incrementAmount;

          if (nextMultiplier >= displayMultiplier) {
            clearInterval(intervalId);
            setIsRolling(false);
            return displayMultiplier;
          }

          return nextMultiplier;
        });
      }, animationSpeed);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRolling, displayMultiplier, setIsRolling]);

  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-3 md:p-6 lg:p-8 flex flex-col">
      <div className="text-gray-400 text-sm md:text-base lg:text-lg">
        This is result
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <span
          className={`text-white text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold transition-all duration-300 ${
            isRolling ? "animate-pulse" : ""
          }`}
        >
          {isRolling
            ? animatedMultiplier.toFixed(2)
            : displayMultiplier.toFixed(2)}
          X
        </span>
      </div>
    </div>
  );
}

export default LimboComponent;

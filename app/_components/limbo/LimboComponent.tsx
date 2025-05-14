"use client";
import { useState, useEffect } from "react";

function LimboComponent() {
  const [multiplier, setMultiplier] = useState(1.04);
  const [isRolling, setIsRolling] = useState(false);
  const [displayMultiplier, setDisplayMultiplier] = useState(1.04);

  const handleRoll = () => {
    setIsRolling(true);
    // Generate random number between 1.00 and 10.00
    const randomMultiplier = (Math.random() * 9 + 1).toFixed(2);
    setMultiplier(Number(randomMultiplier));
  };

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayMultiplier((prev) => {
          const randomChange = (Math.random() * 0.5 - 0.25).toFixed(2);
          return Number((prev + Number(randomChange)).toFixed(2));
        });
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayMultiplier(multiplier);
        setIsRolling(false);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isRolling, multiplier]);

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
          {displayMultiplier}x
        </span>
      </div>
    </div>
  );
}

export default LimboComponent;

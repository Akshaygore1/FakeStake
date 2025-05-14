"use client";
import { useState, useEffect } from "react";
import { useLimboStore } from "@/app/_store/limboStore";

function LimboComponent() {
  const { isRolling, setIsRolling, displayMultiplier, recentWins } =
    useLimboStore();
  const [animatedMultiplier, setAnimatedMultiplier] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRolling) {
      setAnimatedMultiplier(0);

      const animationSpeed = 100;
      const incrementAmount = 0.1;
      const minDuration = 1000;

      let startTime = Date.now();

      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;

        const progress = Math.min(elapsedTime / minDuration, 1);

        const easedProgress = progress < 1 ? Math.pow(progress, 2) : progress;

        const nextMultiplier = easedProgress * displayMultiplier;

        if (
          progress >= 1 &&
          nextMultiplier >= displayMultiplier - incrementAmount
        ) {
          clearInterval(intervalId);
          setAnimatedMultiplier(displayMultiplier);
          setIsRolling(false);
        } else {
          setAnimatedMultiplier(nextMultiplier);
        }
      }, animationSpeed);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRolling, displayMultiplier, setIsRolling]);

  const formattedMultiplier = isRolling
    ? animatedMultiplier.toFixed(2)
    : displayMultiplier.toFixed(2);
  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-3 md:p-6 lg:p-8 flex flex-col">
      <div className="flex flex-row-reverse items-center w-full justify-end gap-2 overflow-x-auto no-scrollbar">
        {recentWins
          .slice(-17)
          .map(
            (item: { isWin: boolean; randomNumber: number }, index: number) => (
              <div key={index} className="flex-shrink-0">
                <div
                  className={`w-8 h-4 px-6  py-4 rounded-full flex items-center justify-center ${
                    item.isWin
                      ? "bg-success text-black"
                      : "bg-neutral-700 text-white"
                  }`}
                >
                  <span className="text-xs font-bold">
                    {item.randomNumber.toFixed(2)}
                  </span>
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <span
          className={`text-white text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold transition-all duration-300 ${
            isRolling ? "animate-pulse" : ""
          }`}
        >
          {formattedMultiplier}X
        </span>
      </div>
    </div>
  );
}

export default LimboComponent;

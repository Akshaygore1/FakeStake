"use client";
import React, { useState, useEffect } from "react";

const DiceComponent: React.FC = () => {
  const [dice, setDice] = useState<number>(50);
  const [rolling, setRolling] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<number>(0);

  useEffect(() => {
    let animationFrame: number;
    if (rolling) {
      const animate = () => {
        setAnimationProgress((prev) => (prev + 2) % 100);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [rolling]);

  const handleClick = () => {
    setRolling(true);
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const interval = setInterval(() => {
      setDice((prevDice) => {
        const diff = randomValue - prevDice;
        const increment =
          Math.abs(diff) > 10 ? 10 * Math.sign(diff) : Math.sign(diff);
        const nextDice = prevDice + increment;
        if (nextDice === randomValue) {
          clearInterval(interval);
          setRolling(false);
        }
        return nextDice;
      });
    }, 50);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        {" "}
        {/* Increased max-width */}
        <div className="flex items-center justify-center mb-4">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg ${
              rolling ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={rolling ? undefined : handleClick}
            disabled={rolling}
          >
            {rolling ? "Rolling..." : "Roll"}
          </button>
        </div>
        <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{ width: `${dice}%` }}
          ></div>
          {rolling && (
            <div
              className="absolute top-0 left-0 h-full bg-white opacity-30"
              style={{
                width: "20%",
                left: `${animationProgress}%`,
                transition: "left 0.1s linear",
              }}
            ></div>
          )}
          <div
            className="absolute top-0 left-0 h-full w-1 bg-white shadow-md"
            style={{ left: `${dice}%`, transform: "translateX(-50%)" }}
          ></div>
        </div>
        <div className="mt-2 text-center font-bold text-xl">{dice}</div>
      </div>
    </div>
  );
};

export default DiceComponent;

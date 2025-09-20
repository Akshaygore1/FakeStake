/* eslint-disable @next/next/no-img-element */

"use client";
import { useState } from "react";
import { useRouletteStore } from "@/app/_store/rouletteStore";

// European roulette wheel order - matches the actual wheel image layout
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

interface RouletteWheelProps {
  onSpinComplete?: (winningNumber: number) => void;
}

export default function RouletteWheel({ onSpinComplete }: RouletteWheelProps) {
  const { isSpinning, setIsSpinning, setLastWinningNumber } =
    useRouletteStore();

  const [winningNumber, setWinningNumber] = useState<number | null>(null);

  const getNumberColor = (number: number) => {
    if (number === 0) return "text-green-400";
    return redNumbers.includes(number) ? "text-red-400" : "text-white";
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinningNumber(null);
    setSpinStartTime(Date.now());

    // Generate random winning number using the same array as original
    const wheelnumbersAC = [
      0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10,
      23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
    ];
    const randomWinningNumber = Math.floor(Math.random() * 37);

    // Find the degree for the winning number
    let degree = 0;
    for (let i = 0; i < wheelnumbersAC.length; i++) {
      if (wheelnumbersAC[i] === randomWinningNumber) {
        degree = i * 9.73 + 362;
        break;
      }
    }

    console.log(
      "Spinning to number:",
      randomWinningNumber,
      "at degree:",
      degree
    );

    // Apply CSS animations to wheel and ball track
    const wheelElement = document.querySelector(".wheel") as HTMLElement;
    const ballTrackElement = document.querySelector(
      ".ballTrack"
    ) as HTMLElement;

    if (wheelElement && ballTrackElement) {
      // Start wheel and ball rotation
      wheelElement.style.cssText = "animation: wheelRotate 5s linear infinite;";
      ballTrackElement.style.cssText =
        "animation: ballRotate 1s linear infinite;";

      // After 2 seconds, slow down the ball
      setTimeout(() => {
        ballTrackElement.style.cssText =
          "animation: ballRotate 2s linear infinite;";

        // Create dynamic keyframe for ball stop
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerText = `@keyframes ballStop {from {transform: rotate(0deg);}to{transform: rotate(-${degree}deg);}}`;
        document.head.appendChild(style);
      }, 2000);

      // After 6 seconds, apply the stopping animation
      setTimeout(() => {
        ballTrackElement.style.cssText = "animation: ballStop 3s linear;";
      }, 6000);

      // After 9 seconds, set final position
      setTimeout(() => {
        ballTrackElement.style.cssText = `transform: rotate(-${degree}deg);`;
      }, 9000);

      // After 10 seconds, clean up and show result
      setTimeout(() => {
        wheelElement.style.cssText = "";
        const styleElement = document.querySelector('style[type="text/css"]');
        if (styleElement) styleElement.remove();

        setWinningNumber(randomWinningNumber);
        setLastWinningNumber(randomWinningNumber);
        setIsSpinning(false);
        onSpinComplete?.(randomWinningNumber);
      }, 10000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas Wheel Container */}

      <div className="w-full h-full flex justify-center items-center">
        <div className="wheel">
          <div className="outerRim">
            {wheelNumbers.map((number, index) => {
              const spanClass = number < 10 ? "single" : "double";
              return (
                <div key={number} id={`sect${index + 1}`} className="sect">
                  <span className={spanClass}>{number}</span>
                  <div className="block"></div>
                </div>
              );
            })}
          </div>
          <div className="pocketsRim"></div>

          <div className="ballTrack">
            <div className="ball"></div>
          </div>

          <div className="pockets"></div>
          <div className="cone"></div>
          <div className="turret"></div>

          <div className="turretHandle">
            <div className="thendOne"></div>
            <div className="thendTwo"></div>
          </div>
        </div>
      </div>

      {/* Winning Number Display */}
      {winningNumber !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Winning Number</div>
          <div
            className={`text-4xl font-bold ${getNumberColor(winningNumber)}`}
          >
            {winningNumber}
          </div>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
          isSpinning
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-yellow-600 hover:bg-yellow-700 hover:scale-105"
        }`}
      >
        {isSpinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
function setSpinStartTime(arg0: number) {
  throw new Error("Function not implemented.");
}

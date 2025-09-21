"use client";
import React, { useState, useCallback, useRef } from "react";
import { useRouletteStore } from "@/app/_store/rouletteStore";
import "./Roulette.css";

// European roulette wheel order - matches the actual wheel image layout
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

// Game constants matching the working implementation
const wheelnumbersAC = [
  0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23,
  8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
];

interface RouletteWheelProps {
  onSpinComplete?: (winningNumber: number) => void;
}

interface RouletteWheelRef {
  wheelRef: React.RefObject<HTMLDivElement | null>;
  ballTrackRef: React.RefObject<HTMLDivElement | null>;
}

const Wheel = React.forwardRef<RouletteWheelRef, any>((_, ref) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const ballTrackRef = useRef<HTMLDivElement>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      wheelRef,
      ballTrackRef,
    }),
    []
  );

  return (
    <div className="wheel" ref={wheelRef}>
      <div className="outerRim"></div>
      {wheelNumbers.map((number, index) => (
        <div key={index} id={`sect${index + 1}`} className="sect">
          <span className={number < 10 ? "single" : "double"}>{number}</span>
          <div className="block"></div>
        </div>
      ))}
      <div className="pocketsRim"></div>
      <div className="ballTrack" ref={ballTrackRef}>
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
  );
});

Wheel.displayName = "Wheel";

export default function RouletteWheel({ onSpinComplete }: RouletteWheelProps) {
  const { isSpinning, setIsSpinning, setLastWinningNumber } =
    useRouletteStore();

  const [winningNumber, setWinningNumber] = useState<number | null>(null);

  // Ref for the wheel component
  const wheelComponentRef = useRef<RouletteWheelRef>(null);

  const getNumberColor = (number: number) => {
    if (number === 0) return "text-green-400";
    return redNumbers.includes(number) ? "text-red-400" : "text-white";
  };

  const spinWheelAnimation = useCallback((winningSpin: number) => {
    const wheelComponent = wheelComponentRef.current;
    if (!wheelComponent) return;

    const wheel = wheelComponent.wheelRef.current;
    const ballTrack = wheelComponent.ballTrackRef.current;

    if (!wheel || !ballTrack) return;

    let degree = 0;
    for (let i = 0; i < wheelnumbersAC.length; i++) {
      if (wheelnumbersAC[i] === winningSpin) {
        degree = i * 9.73 + 362;
        break;
      }
    }

    wheel.style.animation = "wheelRotate 5s linear infinite";
    ballTrack.style.animation = "ballRotate 1s linear infinite";

    setTimeout(() => {
      ballTrack.style.animation = "ballRotate 2s linear infinite";
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerText = `@keyframes ballStop {from {transform: rotate(0deg);}to{transform: rotate(-${degree}deg);}}`;
      document.head.appendChild(style);

      setTimeout(() => {
        ballTrack.style.animation = "ballStop 3s linear";
      }, 4000);

      setTimeout(() => {
        ballTrack.style.transform = `rotate(-${degree}deg)`;
      }, 7000);

      setTimeout(() => {
        wheel.style.animation = "";
        style.remove();
      }, 8000);
    }, 2000);
  }, []);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinningNumber(null);

    const randomWinningNumber = Math.floor(Math.random() * 37);
    spinWheelAnimation(randomWinningNumber);

    setTimeout(() => {
      setWinningNumber(randomWinningNumber);
      setLastWinningNumber(randomWinningNumber);
      setIsSpinning(false);
      onSpinComplete?.(randomWinningNumber);
    }, 10000);
  }, [
    isSpinning,
    spinWheelAnimation,
    setIsSpinning,
    setLastWinningNumber,
    onSpinComplete,
  ]);

  return (
    <div className="container">
      <div id="container">
        <Wheel ref={wheelComponentRef} />
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

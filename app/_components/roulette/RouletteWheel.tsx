/* eslint-disable @next/next/no-img-element */

"use client";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const [ballAngle, setBallAngle] = useState(0);
  const [ballRadius, setBallRadius] = useState(140);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [targetBallAngle, setTargetBallAngle] = useState(0);
  const [spinStartTime, setSpinStartTime] = useState(0);

  const CANVAS_SIZE = 250;
  const WHEEL_RADIUS = 150;
  const BALL_SIZE = 5;

  const getNumberColor = (number: number) => {
    if (number === 0) return "text-green-400";
    return redNumbers.includes(number) ? "text-red-400" : "text-white";
  };

  // Function to get the winning number based on pointer ball position
  const getWinningNumberFromBallPosition = useCallback((ballAngle: number) => {
    // The pointer ball rotates around the wheel
    // We need to find which number segment the pointer ball is positioned over

    const degreesPerNumber = 360 / wheelNumbers.length;

    // Normalize ball angle to 0-360 range
    const normalizedBallAngle = ((ballAngle % 360) + 360) % 360;

    // The ball angle represents where the pointer ball is positioned
    // We need to find which number segment the pointer ball is over
    // In our coordinate system, 0 degrees is to the right, 90 is down, 180 is left, 270 is up
    // We need to map this to the wheel number positions
    const adjustedAngle = (normalizedBallAngle + 90) % 360; // Adjust for coordinate system

    // Calculate which number index the pointer ball is over
    const numberIndex = Math.floor(adjustedAngle / degreesPerNumber);

    // Get the number at this position
    const winningNum = wheelNumbers[numberIndex];

    console.log("Debug:", {
      ballAngle,
      normalizedBallAngle,
      adjustedAngle,
      numberIndex,
      winningNum,
      degreesPerNumber,
    });

    return winningNum;
  }, []);

  // Canvas drawing function - only draws ball and pointer, wheel is CSS background
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = CANVAS_SIZE / 2;
    const centerY = CANVAS_SIZE / 2;

    // Clear canvas (wheel is handled by CSS background)
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw rotating pointer ball
    const pointerX =
      centerX + Math.cos((ballAngle * Math.PI) / 180) * ballRadius;
    const pointerY =
      centerY + Math.sin((ballAngle * Math.PI) / 180) * ballRadius;

    // Pointer ball shadow
    ctx.beginPath();
    ctx.arc(pointerX + 1, pointerY + 1, BALL_SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fill();

    // Pointer ball
    ctx.beginPath();
    ctx.arc(pointerX, pointerY, BALL_SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = "#fbbf24";
    ctx.fill();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [ballAngle, ballRadius]);

  // Animation loop
  const animate = useCallback(() => {
    if (!isSpinning) return;

    const now = Date.now();
    const elapsed = now - spinStartTime;
    const duration = 4000; // 4 seconds
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for realistic deceleration
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Update ball position (wheel stays stationary)
    const currentBallAngle =
      ballAngle + (targetBallAngle - ballAngle) * easeOut;
    setBallAngle(currentBallAngle);

    // Move ball inward as it slows down
    const initialRadius = 120;
    const finalRadius = 120;
    const currentRadius =
      initialRadius - (initialRadius - finalRadius) * easeOut;
    setBallRadius(currentRadius);

    drawCanvas();

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Animation complete
      const finalWinningNumber =
        getWinningNumberFromBallPosition(currentBallAngle);
      setWinningNumber(finalWinningNumber);
      setLastWinningNumber(finalWinningNumber);
      setIsSpinning(false);
      onSpinComplete?.(finalWinningNumber);
    }
  }, [
    isSpinning,
    spinStartTime,
    ballAngle,
    targetBallAngle,
    drawCanvas,
    getWinningNumberFromBallPosition,
    setIsSpinning,
    setLastWinningNumber,
    onSpinComplete,
  ]);

  // Initial canvas draw
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Animation effect
  useEffect(() => {
    if (isSpinning) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, animate]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinningNumber(null);
    setSpinStartTime(Date.now());

    // Generate random winning number
    const randomWinningNumber =
      wheelNumbers[Math.floor(Math.random() * wheelNumbers.length)];
    const numberIndex = wheelNumbers.indexOf(randomWinningNumber);
    const degreesPerNumber = 360 / wheelNumbers.length;

    console.log(
      "Spinning to number:",
      randomWinningNumber,
      "at index:",
      numberIndex
    );

    // Calculate target ball position
    const ballSpins = 8 + Math.random() * 4; // 8-12 full rotations

    // Calculate where the ball should stop to land on the winning number
    // The ball needs to end up at the position where the winning number is
    // Since pointer is at top, we need to position ball at the winning number's location
    const targetAngleForWinningNumber = numberIndex * degreesPerNumber - 90; // -90 to adjust for pointer at top

    // Target ball angle includes multiple spins plus the final position
    const targetBallAng =
      ballAngle + ballSpins * 360 + targetAngleForWinningNumber;

    console.log("Target ball angle:", targetBallAng);
    console.log("Winning number position:", targetAngleForWinningNumber);

    setTargetBallAngle(targetBallAng);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas Wheel Container */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="w-64 h-64"
          style={{
            backgroundImage: "url('/wheelweb.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // transform: `rotate(${wheelRotation}deg)`,
            // transition: isSpinning
            //   ? "transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            //   : "transform 0.5s ease-out",
          }}
        />
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

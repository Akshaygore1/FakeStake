"use client";
import React, { useState } from "react";
import {
  useRouletteStore,
  getPayoutMultiplier,
} from "@/app/_store/rouletteStore";
import { useCommonStore } from "@/app/_store/commonStore";

// Define which numbers are red in European roulette
const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

export default function RouletteTable() {
  const { balance } = useCommonStore();
  const { betAmount, addBet, isSpinning, currentBets, lastWinningNumber } =
    useRouletteStore();

  const [hoveredBet, setHoveredBet] = useState<string | null>(null);
  // Generate numbers 1-36 in the correct roulette table layout
  const generateNumberGrid = () => {
    const grid = [];
    // Create 3 rows of 12 numbers each
    for (let row = 0; row < 3; row++) {
      const rowNumbers = [];
      for (let col = 0; col < 12; col++) {
        const number = col * 3 + (3 - row);
        rowNumbers.push(number);
      }
      grid.push(rowNumbers);
    }
    return grid;
  };

  const numberGrid = generateNumberGrid();

  // Function to determine if a number should be highlighted based on hovered bet
  const shouldHighlightNumber = (number: number): boolean => {
    if (!hoveredBet) return false;

    switch (hoveredBet) {
      case "1-12":
        return number >= 1 && number <= 12;
      case "13-24":
        return number >= 13 && number <= 24;
      case "25-36":
        return number >= 25 && number <= 36;
      case "1-18":
        return number >= 1 && number <= 18;
      case "19-36":
        return number >= 19 && number <= 36;
      case "even":
        return number > 0 && number % 2 === 0;
      case "odd":
        return number > 0 && number % 2 === 1;
      case "red":
        return redNumbers.includes(number);
      case "black":
        return number > 0 && !redNumbers.includes(number);
      case "2to1-top":
        return number > 0 && number % 3 === 1;
      case "2to1-middle":
        return number > 0 && number % 3 === 2;
      case "2to1-bottom":
        return number > 0 && number % 3 === 0;
      default:
        return false;
    }
  };

  const getNumberColor = (number: number) => {
    const isHighlighted = shouldHighlightNumber(number);
    const isWinningNumber = lastWinningNumber === number;

    const baseColor =
      number === 0
        ? "bg-green-600"
        : redNumbers.includes(number)
        ? "bg-red-600"
        : "bg-gray-800";

    const hoverColor =
      number === 0
        ? "hover:bg-green-700"
        : redNumbers.includes(number)
        ? "hover:bg-red-700"
        : "hover:bg-gray-700";

    const highlightColor = isHighlighted
      ? number === 0
        ? "bg-green-400"
        : redNumbers.includes(number)
        ? "bg-red-400"
        : "bg-gray-500"
      : baseColor;

    // Add winning number styling
    const winningStyle = isWinningNumber
      ? "ring-4 ring-yellow-300 animate-pulse"
      : "";
    const highlightRing =
      isHighlighted && !isWinningNumber ? "ring-2 ring-yellow-400" : "";

    return `${highlightColor} ${hoverColor} ${winningStyle} ${highlightRing}`;
  };

  const handleBet = (type: string, value: number | string) => {
    if (isSpinning || betAmount <= 0 || betAmount > balance) {
      return;
    }

    // Calculate total current bets
    const totalCurrentBets = currentBets.reduce(
      (sum, bet) => sum + bet.amount,
      0
    );

    // Check if user has enough balance for this bet
    if (totalCurrentBets + betAmount > balance) {
      alert("Insufficient balance for this bet!");
      return;
    }

    const payout = getPayoutMultiplier(type, value);

    const newBet = {
      type,
      value,
      amount: betAmount,
      payout,
    };

    addBet(newBet);
    console.log(
      `Bet placed: ${type} - ${value} for $${betAmount} (${
        payout + 1
      }:1 payout)`
    );
  };
  const handleHover = (value: string | null) => {
    setHoveredBet(value);
  };

  return (
    <div className="bg-[#0f1419] p-2 sm:p-4 rounded-lg w-full overflow-x-auto">
      <div className="bg-[#1a2332] p-2 sm:p-4 lg:p-6 rounded-lg min-w-[600px]">
        {/* Main betting table */}
        <div className="flex gap-1">
          {/* Zero section */}
          <div className="flex flex-col">
            <button
              onClick={() => handleBet("number", 0)}
              className={`w-8 sm:w-10 lg:w-12 h-24 sm:h-28 lg:h-32 ${getNumberColor(
                0
              )} text-white font-bold text-sm sm:text-base lg:text-lg border border-gray-600 transition-colors flex items-center justify-center`}
            >
              0
            </button>
          </div>

          {/* Number grid */}
          <div className="flex-1 gap-1 flex flex-col">
            <div className="grid grid-cols-12 gap-1">
              {numberGrid.map((row, rowIndex) =>
                row.map((number, colIndex) => (
                  <button
                    key={number}
                    onClick={() => handleBet("number", number)}
                    className={`h-6 sm:h-8 lg:h-10 ${getNumberColor(
                      number
                    )} text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors hover:scale-105 active:scale-95`}
                  >
                    {number}
                  </button>
                ))
              )}
            </div>

            {/* Bottom betting sections */}
            <div className="grid grid-cols-4 sm:grid-cols-3 gap-1">
              <button
                onClick={() => handleBet("range", "1-12")}
                onMouseEnter={() => handleHover("1-12")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">1 to 12</span>
                <span className="sm:hidden">1-12</span>
              </button>
              <button
                onClick={() => handleBet("range", "13-24")}
                onMouseEnter={() => handleHover("13-24")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">13 to 24</span>
                <span className="sm:hidden">13-24</span>
              </button>

              <button
                onClick={() => handleBet("range", "25-36")}
                onMouseEnter={() => handleHover("25-36")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">25 to 36</span>
                <span className="sm:hidden">25-36</span>
              </button>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-6 gap-1">
              <button
                onClick={() => handleBet("range", "1-18")}
                onMouseEnter={() => handleHover("1-18")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">1 to 18</span>
                <span className="sm:hidden">1-18</span>
              </button>
              <button
                onClick={() => handleBet("type", "even")}
                onMouseEnter={() => handleHover("even")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">Even</span>
                <span className="sm:hidden">Even</span>
              </button>
              <button
                onClick={() => handleBet("color", "red")}
                onMouseEnter={() => handleHover("red")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-red-600 hover:bg-red-800 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                Red
              </button>
              <button
                onClick={() => handleBet("color", "black")}
                onMouseEnter={() => handleHover("black")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-900 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                Black
              </button>

              <button
                onClick={() => handleBet("type", "odd")}
                onMouseEnter={() => handleHover("odd")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">Odd</span>
                <span className="sm:hidden">Odd</span>
              </button>
              <button
                onClick={() => handleBet("range", "19-36")}
                onMouseEnter={() => handleHover("19-36")}
                onMouseLeave={() => handleHover(null)}
                className="h-8 sm:h-10 lg:h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs sm:text-sm border border-gray-600 transition-colors"
              >
                <span className="hidden sm:inline">19 to 36</span>
                <span className="sm:hidden">19-36</span>
              </button>
            </div>
          </div>

          {/* 2:1 columns */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleBet("column", "2to1-top")}
              onMouseEnter={() => handleHover("2to1-bottom")}
              onMouseLeave={() => handleHover(null)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs border border-gray-600 transition-colors"
            >
              2:1
            </button>
            <button
              onClick={() => handleBet("column", "2to1-middle")}
              onMouseEnter={() => handleHover("2to1-middle")}
              onMouseLeave={() => handleHover(null)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs border border-gray-600 transition-colors"
            >
              2:1
            </button>
            <button
              onClick={() => handleBet("column", "2to1-bottom")}
              onMouseEnter={() => handleHover("2to1-top")}
              onMouseLeave={() => handleHover(null)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs border border-gray-600 transition-colors"
            >
              2:1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

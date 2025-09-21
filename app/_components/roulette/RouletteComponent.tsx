"use client";
import React from "react";
import RouletteTable from "./RouletteTable";
import RouletteWheel from "./RouletteWheel";
import {
  useRouletteStore,
  getPayoutMultiplier,
} from "@/app/_store/rouletteStore";
import { useCommonStore } from "@/app/_store/commonStore";

// Define which numbers are red in European roulette
const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

function RouletteComponent() {
  const { balance, setBalance } = useCommonStore();
  const { currentBets, clearBets, addGameResult, isSpinning, setIsSpinning } =
    useRouletteStore();

  // Check if a number wins a specific bet
  const checkBetWin = (bet: any, winningNumber: number): boolean => {
    switch (bet.type) {
      case "number":
        return bet.value === winningNumber;
      case "range":
        if (bet.value === "1-12")
          return winningNumber >= 1 && winningNumber <= 12;
        if (bet.value === "13-24")
          return winningNumber >= 13 && winningNumber <= 24;
        if (bet.value === "25-36")
          return winningNumber >= 25 && winningNumber <= 36;
        if (bet.value === "1-18")
          return winningNumber >= 1 && winningNumber <= 18;
        if (bet.value === "19-36")
          return winningNumber >= 19 && winningNumber <= 36;
        return false;
      case "type":
        if (bet.value === "even")
          return winningNumber > 0 && winningNumber % 2 === 0;
        if (bet.value === "odd")
          return winningNumber > 0 && winningNumber % 2 === 1;
        return false;
      case "color":
        if (bet.value === "red") return redNumbers.includes(winningNumber);
        if (bet.value === "black")
          return winningNumber > 0 && !redNumbers.includes(winningNumber);
        return false;
      case "column":
        if (bet.value === "2to1-top")
          return winningNumber > 0 && winningNumber % 3 === 1;
        if (bet.value === "2to1-middle")
          return winningNumber > 0 && winningNumber % 3 === 2;
        if (bet.value === "2to1-bottom")
          return winningNumber > 0 && winningNumber % 3 === 0;
        return false;
      default:
        return false;
    }
  };

  const handleSpinComplete = (winningNumber: number) => {
    if (currentBets.length === 0) return;

    let totalBet = 0;
    let totalWin = 0;

    // Calculate results for each bet
    const results = currentBets.map((bet) => {
      totalBet += bet.amount;
      const isWin = checkBetWin(bet, winningNumber);
      const winAmount = isWin ? bet.amount * (bet.payout + 1) : 0;
      totalWin += winAmount;

      return {
        ...bet,
        isWin,
        winAmount,
      };
    });

    const profit = totalWin - totalBet;
    const newBalance = balance + profit;

    // Update balance
    setBalance(newBalance);

    // Add to game history
    const gameResult = {
      winningNumber,
      bets: currentBets,
      totalBet,
      totalWin,
      profit,
      timestamp: Date.now(),
    };

    addGameResult(gameResult);

    // Show results
    if (totalWin > 0) {
      setTimeout(() => {
        alert(
          `🎉 You won $${totalWin.toFixed(2)}! (Profit: $${profit.toFixed(2)})`
        );
      }, 1000);
    } else {
      setTimeout(() => {
        alert(`😔 You lost $${totalBet.toFixed(2)}. Better luck next time!`);
      }, 1000);
    }

    // Clear bets after a delay
    setTimeout(() => {
      clearBets();
    }, 3000);
  };

  const canSpin = currentBets.length > 0 && !isSpinning;
  const totalBetAmount = currentBets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="bg-[#1a2332] p-4 rounded-lg">
        <div className="flex justify-between items-center text-white">
          <div>
            <span className="text-[#b0b9d2]">Total Bets: </span>
            <span className="text-yellow-400 font-bold">
              ${totalBetAmount.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[#b0b9d2]">Status: </span>
            <span
              className={`font-bold ${
                isSpinning
                  ? "text-yellow-400"
                  : canSpin
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              {isSpinning
                ? "Spinning..."
                : canSpin
                ? "Ready to Spin"
                : "Place Your Bets"}
            </span>
          </div>
        </div>
      </div>

      {/* Roulette Wheel */}
      <div className="bg-[#1a2332] p-6 rounded-lg">
        <RouletteWheel onSpinComplete={handleSpinComplete} />
      </div>

      {/* Betting Table */}
      <RouletteTable />
    </div>
  );
}

export default RouletteComponent;

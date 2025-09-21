"use client";

import { Coins } from "lucide-react";
import React from "react";
import { useCommonStore } from "@/app/_store/commonStore";
import { useRouletteStore } from "@/app/_store/rouletteStore";

function RouletteConfig() {
  const { balance, setBalance } = useCommonStore();
  const { betAmount, setBetAmount, currentBets, clearBets, isSpinning } =
    useRouletteStore();

  const [inputValue, setInputValue] = React.useState(betAmount.toString());

  // Calculate total bet amount
  const totalBetAmount = currentBets.reduce((sum, bet) => sum + bet.amount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setBetAmount(numValue);
    }
  };

  const handleHalfBet = () => {
    const newAmount = betAmount / 2;
    setBetAmount(newAmount);
    setInputValue(newAmount.toString());
  };

  const handleDoubleBet = () => {
    const newAmount = betAmount * 2;
    if (newAmount <= balance) {
      setBetAmount(newAmount);
      setInputValue(newAmount.toString());
    }
  };

  const handleClearBets = () => {
    clearBets();
  };

  return (
    <div className="flex flex-col gap-6 p-4 text-white max-w-md mx-auto rounded-lg">
      {/* Balance and Bet Amount Header */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[#b0b9d2]">Bet Amount</span>
          <span className="text-white">Balance: ${balance.toFixed(2)}</span>
        </div>
        {totalBetAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#b0b9d2]">Total Bets:</span>
            <span className="text-yellow-400">
              ${totalBetAmount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Bet Amount Input */}
      <div className="flex bg-[#1e2a36] rounded-md overflow-hidden">
        <div className="flex-1 flex items-center relative">
          <input
            type="number"
            id="betAmount"
            value={inputValue}
            min={0.01}
            step={0.01}
            onChange={handleInputChange}
            disabled={isSpinning}
            className="w-full bg-[#1e2a36] px-3 py-3 outline-none text-white disabled:opacity-50"
            onClick={(e) => e.currentTarget.select()}
          />
          <div className="absolute right-3 pointer-events-none">
            <Coins className="w-4 h-4 text-success" />
          </div>
        </div>
        <button
          className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white disabled:opacity-50"
          onClick={handleHalfBet}
          disabled={!betAmount || betAmount <= 0 || isSpinning}
        >
          ½
        </button>
        <button
          className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white disabled:opacity-50"
          onClick={handleDoubleBet}
          disabled={
            !betAmount ||
            betAmount <= 0 ||
            betAmount * 2 > balance ||
            isSpinning
          }
        >
          2×
        </button>
      </div>

      {/* Current Bets Display */}
      {currentBets.length > 0 && (
        <div className="bg-[#1e2a36] rounded-md p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#b0b9d2]">Current Bets</span>
            <button
              onClick={handleClearBets}
              disabled={isSpinning}
              className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {currentBets.map((bet, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-white">
                  {bet.type === "number" ? `#${bet.value}` : `${bet.value}`}
                </span>
                <span className="text-yellow-400">
                  ${bet.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Bets Button */}
      {currentBets.length > 0 && (
        <button
          onClick={handleClearBets}
          disabled={isSpinning}
          className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Clear All Bets
        </button>
      )}
    </div>
  );
}

export default RouletteConfig;

"use client";

import React from "react";
import { useCommonStore } from "@/stores/common.store";
import { useRouletteStore } from "@/stores/game/roulette.store";
import GameConfig from "@/app/_components/GameConfig";

function RouletteConfig() {
  const { balance } = useCommonStore();
  const { betAmount, setBetAmount, currentBets, clearBets, isSpinning } =
    useRouletteStore();

  // Calculate total bet amount
  const totalBetAmount = currentBets.reduce((sum, bet) => sum + bet.amount, 0);

  const handleClearBets = () => {
    clearBets();
  };

  // Custom status display showing total bets
  const customStatusDisplay =
    totalBetAmount > 0 ? (
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#b0b9d2]">Total Bets:</span>
        <span className="text-yellow-400">${totalBetAmount.toFixed(2)}</span>
      </div>
    ) : null;

  // Current bets display as additional content
  const additionalContent =
    currentBets.length > 0 ? (
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
              <span className="text-yellow-400">${bet.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  // Clear all bets button
  const secondaryButtons =
    currentBets.length > 0
      ? [
          {
            id: "clearBets",
            label: "Clear All Bets",
            onClick: handleClearBets,
            disabled: isSpinning,
            variant: "danger" as const,
          },
        ]
      : [];

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={setBetAmount}
      betInputDisabled={isSpinning}
      customStatusDisplay={customStatusDisplay}
      additionalContent={additionalContent}
      secondaryButtons={secondaryButtons}
    />
  );
}

export default RouletteConfig;

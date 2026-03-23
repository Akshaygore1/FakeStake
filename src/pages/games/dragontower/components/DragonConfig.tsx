"use client";

import React from "react";
import { useCommonStore } from "@/stores/common.store";
import GameConfig from "@/components/game/GameConfig";
import { Button } from "@/components/ui/button";
import { useDragonStore } from "@/stores/game/dragon.store";

type Difficulty = "easy" | "medium" | "hard";

const difficultyOptions: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function DragonConfig() {
  const { balance, setBalance } = useCommonStore();
  const {
    betAmount,
    setBetAmount,
    difficulty,
    setDifficulty,
    isPlaying,
    initGame,
    multiplier,
    completedRows,
    cashout,
    setIsPlaying,
  } = useDragonStore();

  const handleDifficultySelect = (newDifficulty: Difficulty) => {
    if (!isPlaying) {
      setDifficulty(newDifficulty);
    }
  };

  const [error, setError] = React.useState<string>("");

  const handleBetAmountChange = (newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const handleBetClick = (amount: number) => {
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      initGame();
      setIsPlaying(true);
    }
  };

  const handleCashout = () => {
    cashout();
  };

  const potentialWin = Math.round(betAmount * multiplier * 100) / 100;

  const primaryButton = isPlaying
    ? {
        id: "cashout",
        label: `Cash Out (${multiplier.toFixed(2)}x) - $${potentialWin.toFixed(
          2
        )}`,
        onClick: handleCashout,
        disabled: completedRows === 0,
      }
    : {
        id: "bet",
        label: "Bet",
        onClick: () => handleBetClick(betAmount),
        disabled:
          !betAmount || betAmount <= 0 || betAmount > balance || error !== "",
      };

  const additionalContent = (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-300">Difficulty</label>
      <div className="grid grid-cols-3 gap-3">
        {difficultyOptions.map((option) => (
          <Button
            key={option.value}
            variant={difficulty === option.value ? "secondary" : "outline"}
            size="sm"
            className="text-xs font-semibold uppercase"
            onClick={() => handleDifficultySelect(option.value)}
            disabled={isPlaying}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      showBetInput={true}
      error={error}
      primaryButton={primaryButton}
      additionalContent={additionalContent}
      betInputDisabled={isPlaying}
    />
  );
}

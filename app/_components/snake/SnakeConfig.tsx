"use client";
import { useCommonStore } from "@/store/commonStore";
import React from "react";
import { useSnakeStore, Difficulty } from "@/store/snakeStore";
import GameConfig, { ConfigField } from "../GameConfig";

const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
  { label: "Expert", value: "expert" },
  { label: "Master", value: "master" },
];

function SnakeConfig() {
  const {
    isPlaying,
    setBetAmount,
    betAmount,
    difficulty,
    setDifficulty,
    gameOver,
  } = useSnakeStore();
  const { balance } = useCommonStore();
  const [error, setError] = React.useState<string>("");

  const handleBetAmountChange = (newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const handleDifficultyChange = (newValue: string) => {
    setDifficulty(newValue as Difficulty);
  };

  const additionalFields: ConfigField[] = [
    {
      id: "difficulty",
      label: "Difficulty",
      type: "select",
      value: difficulty,
      onChange: handleDifficultyChange,
      options: difficultyOptions,
      disabled: isPlaying,
    },
  ];

  const primaryButton = {
    id: "bet",
    label: isPlaying
      ? "Playing..."
      : betAmount > balance
      ? "Insufficient Balance"
      : "Bet",
    onClick: () => {},
    disabled:
      !betAmount ||
      betAmount <= 0 ||
      betAmount > balance ||
      isPlaying ||
      error !== "",
    loading: isPlaying,
    loadingText: "Playing...",
  };

  const secondaryButtons = [
    {
      id: "roll",
      label: gameOver ? "Play Again" : "Start Game",
      onClick: () => {},
      disabled:
        !betAmount || betAmount <= 0 || betAmount > balance || isPlaying,
      variant: "secondary" as const,
    },
  ];

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      additionalFields={additionalFields}
      error={error}
      primaryButton={primaryButton}
      secondaryButtons={secondaryButtons}
      betInputDisabled={isPlaying}
    />
  );
}

export default SnakeConfig;

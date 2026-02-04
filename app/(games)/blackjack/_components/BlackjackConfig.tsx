"use client";
import React, { useState, useEffect } from "react";
import { useCommonStore } from "@/stores/common.store";
import { useBlackjackStore } from "@/stores/game/blackjack.store";
import GameConfig from "@/app/_components/GameConfig";

function BlackjackConfig() {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { balance, setBalance } = useCommonStore();
  const {
    gameStatus,
    betAmount: currentBet,
    placeBet,
    newGame,
    initializeDeck,
  } = useBlackjackStore();

  // Initialize deck when component mounts
  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const betAmount = parseFloat(inputValue) || 0;

  const handleBetAmountChange = (newValue: number) => {
    setInputValue(newValue.toString());
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const handleBetClick = () => {
    const parsedBetAmount = parseFloat(inputValue);
    if (
      gameStatus !== "betting" ||
      parsedBetAmount <= 0 ||
      parsedBetAmount > balance ||
      error
    )
      return;

    // Deduct bet amount from balance
    setBalance(balance - parsedBetAmount);
    placeBet(parsedBetAmount);
  };

  const handleNewGame = () => {
    newGame();
  };

  // Primary button logic
  const primaryButton =
    gameStatus === "betting"
      ? {
          id: "dealCards",
          label: betAmount > balance ? "Insufficient Balance" : "Deal Cards",
          onClick: handleBetClick,
          disabled:
            !inputValue || betAmount <= 0 || betAmount > balance || !!error,
        }
      : gameStatus === "game-over"
      ? {
          id: "newGame",
          label: "Bet",
          onClick: handleNewGame,
          variant: "primary" as const,
          disabled: !betAmount || betAmount <= 0 || betAmount > balance,
        }
      : undefined;

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      showBetInput={true}
      error={error}
      primaryButton={primaryButton}
    />
  );
}

export default BlackjackConfig;

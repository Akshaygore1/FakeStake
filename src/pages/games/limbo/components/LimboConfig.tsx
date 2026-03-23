"use client";
import { useCommonStore } from "@/stores/common.store";
import React from "react";
import { useLimboStore } from "@/stores/game/limbo.store";
import GameConfig, { ConfigField } from "@/components/game/GameConfig";

function LimboConfig({ onBet }: { onBet: (amount: number) => void }) {
  const { isRolling, setBetAmount, betAmount, multiplier, setMultiplier } =
    useLimboStore();
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

  const handleMultiplierChange = (newValue: number) => {
    if (newValue >= 99 || newValue <= 1) {
      setError("Multiplier should be between 1 and 100");
    } else {
      setError("");
    }
    setMultiplier(newValue);
  };

  const additionalFields: ConfigField[] = [
    {
      id: "multiplier",
      label: "Multiplier",
      type: "input",
      value: multiplier,
      onChange: handleMultiplierChange,
      min: 1,
      max: 100,
      step: 1,
    },
  ];

  const primaryButton = {
    id: "bet",
    label: isRolling
      ? "Rolling..."
      : betAmount > balance
      ? "Insufficient Balance"
      : "Bet",
    onClick: () => onBet(betAmount),
    disabled:
      !betAmount ||
      betAmount <= 0 ||
      betAmount > balance ||
      isRolling ||
      error !== "",
    loading: isRolling,
    loadingText: "Rolling...",
  };

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      additionalFields={additionalFields}
      error={error}
      primaryButton={primaryButton}
    />
  );
}

export default LimboConfig;

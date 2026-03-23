"use client";

import React from "react";
import { useCommonStore } from "@/stores/common.store";
import { useFlipStore } from "@/stores/game/flip.store";
import GameConfig from "@/components/game/GameConfig";
import { Button } from "@/components/ui/button";

export default function FlipGameConfig() {
  const { balance } = useCommonStore();
  const {
    selectedSide,
    setSelectedSide,
    betAmount,
    setBetAmount,
    flipCoin,
    isFlipping,
  } = useFlipStore();

  const [error, setError] = React.useState<string>("");

  const handleBetAmountChange = (newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const primaryButton = {
    id: "bet",
    label: isFlipping
      ? "Flipping..."
      : betAmount > balance
      ? "Insufficient Balance"
      : "Flip Coin",
    onClick: () => {
      if (betAmount > 0 && betAmount <= balance && !isFlipping) {
        flipCoin();
      }
    },
    disabled:
      !betAmount ||
      betAmount <= 0 ||
      betAmount > balance ||
      error !== "" ||
      isFlipping,
  };

  const additionalContent = (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-300">Choose Side</label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={() => setSelectedSide("heads")}
          disabled={isFlipping}
          className={`w-full flex flex-row items-center rounded-md font-medium transition-all px-3 py-2 ${
            selectedSide === "heads"
              ? "text-white border-2 border-green-400"
              : "text-gray-300 border-2 border-[#2c3a47] hover:border-gray-500"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <span>Heads</span>
            <span className="w-3 h-3 rounded-full bg-orange-600"></span>
          </div>
        </Button>
        <Button
          type="button"
          onClick={() => setSelectedSide("tails")}
          disabled={isFlipping}
          className={`w-full flex flex-row items-center rounded-md font-medium transition-all px-3 py-2 ${
            selectedSide === "tails"
              ? " text-white border-2 border-green-400"
              : " text-gray-300 border-2 border-[#2c3a47] hover:border-gray-500"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <span>Tails</span>
            <span className="w-3 h-3 -rotate-45 bg-blue-600"></span>
          </div>
        </Button>
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
    />
  );
}

"use client";

import React from "react";
import { useCommonStore } from "@/app/_store/commonStore";
import GameConfig from "../GameConfig";
import { Button } from "@/components/ui/button";
import { useDragonStore } from "@/app/_store/dragonStore";

export default function DragonConfig() {
  const { balance } = useCommonStore();
  const {
    betAmount,
    setBetAmount,
  } = useDragonStore();


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
    label: "Bet",
    onClick: () => handleBetClick(betAmount),
    disabled: !betAmount || betAmount <= 0 || betAmount > balance || error !== "",
  };

  const handleBetClick = (amount: number) => {
    if (amount > 0 && amount <= balance) {
      // TODO: Implement dragon tower logic
    }
  };

  const additionalContent = (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-300">Difficulty</label>
      <div className="grid grid-cols-2 gap-3">
    
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


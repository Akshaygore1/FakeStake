import { useCommonStore } from "@/stores/common.store";
import React from "react";
import GameConfig from "@/app/_components/GameConfig";

function ConfigForDice({ onBet }: { onBet: (amount: number) => void }) {
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const { balance } = useCommonStore();

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
    label: betAmount > balance ? "Insufficient Balance" : "Bet",
    onClick: () => onBet(betAmount),
    disabled:
      !betAmount || betAmount <= 0 || betAmount > balance || error !== "",
  };

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      error={error}
      primaryButton={primaryButton}
    />
  );
}

export default ConfigForDice;

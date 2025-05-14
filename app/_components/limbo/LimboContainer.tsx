"use client";
import { useState } from "react";
import LimboComponent from "./LimboComponent";
import { generateWeightedRandom } from "@/lib/utils";
import LimboConfig from "./LimboConfig";
import { useLimboStore } from "@/app/_store/limboStore";
import { useCommonStore } from "@/app/_store/commonStore";

function LimboContainer() {
  const {
    setIsRolling,
    setDisplayMultiplier,
    recentWins,
    setRecentWins,
    multiplier,
  } = useLimboStore();
  const { balance, setBalance } = useCommonStore();

  const handleBet = (amount: number) => {
    setIsRolling(true);
    const randomMultiplier = generateWeightedRandom();
    let newBalance = balance;

    setDisplayMultiplier(randomMultiplier);
    if (randomMultiplier > multiplier) {
      setRecentWins([
        ...recentWins,
        { isWin: true, randomNumber: randomMultiplier },
      ]);
      newBalance = balance + amount * (randomMultiplier - 1);
    } else {
      setRecentWins([
        ...recentWins,
        { isWin: false, randomNumber: randomMultiplier },
      ]);
      newBalance = balance - amount;
    }
    setBalance(newBalance);
  };

  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 bg-primary">
        <LimboConfig onBet={handleBet} />
      </div>
      <div className="w-full md:w-2/3">
        <LimboComponent />
      </div>
    </div>
  );
}

export default LimboContainer;

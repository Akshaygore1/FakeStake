"use client";
import { useState } from "react";
import LimboComponent from "./LimboComponent";
import { generateWeightedRandom } from "@/lib/utils";
import LimboConfig from "./LimboConfig";
import { useLimboStore } from "@/app/_store/limboStore";
import { useCommonStore } from "@/app/_store/commonStore";
import GameContainer from "../GameContainer";

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
    // Validate bet amount
    if (amount <= 0 || amount > balance) {
      return;
    }

    // Deduct bet amount upfront
    const newBalanceAfterBet = balance - amount;
    setBalance(newBalanceAfterBet);

    setIsRolling(true);
    const randomMultiplier = generateWeightedRandom();

    setDisplayMultiplier(randomMultiplier);
    if (randomMultiplier >= multiplier) {
      // Player wins - add winnings to already reduced balance
      const winnings = amount * multiplier;
      const finalBalance = newBalanceAfterBet + winnings;
      setBalance(finalBalance);
      setRecentWins([
        ...recentWins,
        { isWin: true, randomNumber: randomMultiplier },
      ]);
    } else {
      // Player loses - bet was already deducted
      setRecentWins([
        ...recentWins,
        { isWin: false, randomNumber: randomMultiplier },
      ]);
    }
  };

  return (
    <GameContainer
      configComponent={<LimboConfig onBet={handleBet} />}
      gameComponent={<LimboComponent />}
    />
  );
}

export default LimboContainer;

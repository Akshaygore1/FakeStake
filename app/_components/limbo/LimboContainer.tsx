"use client";
import { useState } from "react";
import LimboComponent from "./LimboComponent";
import { generateWeightedRandom } from "@/lib/utils";
import LimboConfig from "./LimboConfig";

function LimboContainer() {
  const [multiplier, setMultiplier] = useState(1.04);
  const [isRolling, setIsRolling] = useState(false);
  const [displayMultiplier, setDisplayMultiplier] = useState(1);

  const handleBet = (amount: number) => {
    console.log("Bet amount:", amount);
    setIsRolling(true);
    const randomMultiplier = generateWeightedRandom();
    setTimeout(() => {
      setIsRolling(false);
      setDisplayMultiplier(randomMultiplier);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 bg-primary">
        <LimboConfig onBet={handleBet} isRolling={isRolling} />
      </div>
      <div className="w-full md:w-2/3">
        <LimboComponent
          isRolling={isRolling}
          displayMultiplier={displayMultiplier}
          setIsRolling={setIsRolling}
          setDisplayMultiplier={setDisplayMultiplier}
        />
      </div>
    </div>
  );
}

export default LimboContainer;

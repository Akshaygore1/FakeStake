"use client";
import React from "react";
import ConfigForDice from "./ConfigForDice";
import DiceComponent from "./DiceComponent";
import { useCommonStore } from "@/app/_store/commonStore";

function DiceGameContainer() {
  const [multiplier, setMultiplier] = React.useState<number>(2);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [targetNumber, setTargetNumber] = React.useState<number>(0);
  const [value, setValue] = React.useState([50]);
  const [winChance, setWinChance] = React.useState(50);
  const { clearCommonState, setBalance, balance } = useCommonStore();
  const handleBet = (betAmount: number) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setGameStarted(true);

    const newBalance =
      randomNumber > value[0]
        ? balance + betAmount * multiplier
        : balance - betAmount;

    setBalance(newBalance);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3">
        <ConfigForDice onBet={handleBet} />
      </div>
      <div className="w-full md:w-2/3">
        <DiceComponent
          value={value}
          setValue={setValue}
          winChance={winChance}
          setWinChance={setWinChance}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          targetNumber={targetNumber}
          gameStarted={gameStarted}
        />
      </div>
    </div>
  );
}

export default DiceGameContainer;

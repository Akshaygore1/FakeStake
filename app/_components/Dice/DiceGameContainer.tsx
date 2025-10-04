"use client";
import React from "react";
import ConfigForDice from "./ConfigForDice";
import DiceComponent from "./DiceComponent";
import { useCommonStore } from "@/app/_store/commonStore";
import GameContainer from "../GameContainer";

function DiceGameContainer() {
  const [multiplier, setMultiplier] = React.useState<number>(2);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [targetNumber, setTargetNumber] = React.useState<number>(0);
  const [value, setValue] = React.useState([50]);
  const [winChance, setWinChance] = React.useState(50);
  const [result, setResult] = React.useState<
    | {
        isWin: boolean;
        randomNumber: number;
      }[]
  >([]);
  const { setBalance, balance } = useCommonStore();

  const handleBet = (betAmount: number) => {
    // Validate bet amount
    if (betAmount <= 0 || betAmount > balance) {
      return;
    }

    // Deduct bet amount upfront
    const newBalanceAfterBet = balance - betAmount;
    setBalance(newBalanceAfterBet);

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setGameStarted(true);

    // Determine win/loss based on the random number compared to selected value
    const isWin = randomNumber > value[0];

    if (isWin) {
      // Player wins - add winnings to already reduced balance
      const winnings = betAmount * multiplier;
      const finalBalance = newBalanceAfterBet + winnings;
      setBalance(finalBalance);
      setResult([...result, { isWin: true, randomNumber }]);
    } else {
      // Player loses - bet was already deducted
      setResult([...result, { isWin: false, randomNumber }]);
    }
  };

  return (
    <GameContainer
      configComponent={<ConfigForDice onBet={handleBet} />}
      gameComponent={
        <DiceComponent
          value={value}
          setValue={setValue}
          winChance={winChance}
          setWinChance={setWinChance}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          targetNumber={targetNumber}
          gameStarted={gameStarted}
          result={result}
        />
      }
    />
  );
}

export default DiceGameContainer;

"use client";
import React from "react";
import ConfigForDice from "./ConfigForDice";
import DiceComponent from "./DiceComponent";

function DiceGameContainer() {
  const [betAmount, setBetAmount] = React.useState<number | null>(null);
  const [multiplier, setMultiplier] = React.useState<number>(2);
  const [balance, setBalance] = React.useState<number>(0);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [targetNumber, setTargetNumber] = React.useState<number>(0);

  const handleBet = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(randomNumber);
    setShowModal(true);
    setGameStarted(true);
  };

  return (
    <div className="flex gap-8">
      <div>
        <ConfigForDice setBetAmount={setBetAmount} onBet={handleBet} />
      </div>
      <div>
        <DiceComponent
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

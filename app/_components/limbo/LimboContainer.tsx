"use client";
import React from "react";
import LimboComponent from "./LimboComponent";
import ConfigForDice from "../Dice/ConfigForDice";

function LimboContainer() {
  const handleBet = (amount: number) => {
    console.log("Bet amount:", amount);
  };
  const handleHalfAmount = () => {
    console.log("Half amount");
  };
  const handleDoubleAmount = () => {
    console.log("Double amount");
  };
  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 bg-primary">
        <ConfigForDice onBet={handleBet} />
      </div>
      <div className="w-full md:w-2/3">
        <LimboComponent />
      </div>
    </div>
  );
}

export default LimboContainer;

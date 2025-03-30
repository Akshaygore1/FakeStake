"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useConfigStore } from "@/app/_store/configStore";
import { calculateCurrentProfit, getMultiplier } from "@/app/_lib/utils";
import { useGridStore } from "@/app/_store/gridStore";
import { useCommonStore } from "@/app/_store/commonStore";
import Modal from "./ui/Modal";
import { useRockerConfig } from "@/app/_store/rocketConfig";

export default function ConfigForRocket() {
  const {
    betAmount,
    setBetAmount,
    handleSetupGame,
    gameStarted,
    setGameStarted,
  } = useRockerConfig();

  const { multiplier, setMultiplier, setBalance, balance } = useCommonStore();

  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = value === "" ? null : Number(value);
    setBetAmount(amount);
  };

  const handleBet = () => {
    handleSetupGame();
    setGameStarted(true);
    setMultiplier(0);
    setCurrentProfit(betAmount);
    setBalance(balance! - betAmount!);
  };

  const handleCashOut = () => {
    setGameStarted(false);
    setShowModal(true);
    setBalance(balance! + currentProfit!);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 text-white max-w-sm mx-auto rounded-lg">
      <div>
        <label
          htmlFor="betAmount"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Bet Amount
        </label>
        <input
          type="number"
          id="betAmount"
          value={betAmount !== null ? betAmount : ""}
          onChange={handleBetAmountChange}
          className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:border-none focus:outline-none"
          disabled={gameStarted}
        />
      </div>
      <button
        onClick={gameStarted ? handleCashOut : handleBet}
        disabled={betAmount === null}
        className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-white hover:bg-green-700 disabled:bg-gray-600"
      >
        {gameStarted ? "Cashout" : "Bet"}
      </button>
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        result="win"
        amount={currentProfit!}
      />
    </div>
  );
}

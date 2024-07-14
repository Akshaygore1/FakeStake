"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useConfigStore } from "@/app/_store/configStore";
import { calculateCurrentProfit, getMultiplier } from "@/app/_lib/utils";
import { useGridStore } from "@/app/_store/gridStore";
import { useCommonStore } from "@/app/_store/commonStore";
import Modal from "./ui/Modal";

export default function ConfigComponent() {
  const {
    numberOfMines,
    betAmount,
    setNumberOfMines,
    setBetAmount,
    handleSetupGame,
    gameStarted,
    setGameStarted,
    resetGame,
    clearConfigStore,
  } = useConfigStore();

  const { numberOfSuccessfulClicks, resetGrid } = useGridStore();
  const { multiplier, setMultiplier, clearCommonState, setBalance, balance } =
    useCommonStore();

  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = value === "" ? null : Number(value);
    setBetAmount(amount);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault(); // I'm allowing numbers and control keys (like backspace) only.
    }
  };

  const handleNumMinesChange = (numMines: number) => {
    setNumberOfMines(numMines);
  };

  console.log("firstbalance", balance, betAmount);

  const handleBet = () => {
    if (betAmount === null || betAmount > balance!) {
      alert("You don’t have enough balance");
      return;
    }

    handleSetupGame();
    setGameStarted(true);
    setSuccessfulClicks(0);
    setCurrentProfit(betAmount);
    setBalance(balance! - betAmount!);
  };

  const handleTileClick = (isMine: boolean) => {
    if (isMine) {
      setCurrentProfit(0);
      setGameStarted(false);
    } else {
      const newSuccessfulClicks = successfulClicks + 1;
      setSuccessfulClicks(newSuccessfulClicks);
      const newProfit = calculateCurrentProfit(
        betAmount!,
        numberOfMines!,
        newSuccessfulClicks
      );
      setCurrentProfit(newProfit);
    }
  };

  useEffect(() => {
    if (numberOfSuccessfulClicks && betAmount && numberOfMines) {
      const newProfit = getMultiplier(numberOfSuccessfulClicks, numberOfMines!);
      setMultiplier(newProfit);
      setCurrentProfit(newProfit * betAmount);
    }
  }, [betAmount, numberOfMines, numberOfSuccessfulClicks, setMultiplier]);
  console.log(currentProfit, balance);

  const handleCashOut = () => {
    setGameStarted(false);
    clearCommonState();
    clearConfigStore();
    resetGame();
    resetGrid();
    setShowModal(true);
    setBalance(balance! + currentProfit!);
  };

  const handleDisabledBetClick = () => {
    if (betAmount! > balance) {
      alert("You don’t have enough balance");
    }
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
          min={10}
          onChange={handleBetAmountChange}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:border-none focus:outline-none"
          disabled={gameStarted}
        />
        {betAmount! > balance && !gameStarted ? (
          <label
            htmlFor="betAmount"
            className="block mb-2 text-sm font-medium text-red-500"
          >
            Insufficent balance :(
          </label>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-2">
        {[1, 3, 5, 10].map((numMines) => (
          <button
            key={numMines}
            onClick={() => handleNumMinesChange(numMines)}
            className={`w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:border-none focus:outline-none ${
              numberOfMines === numMines ? "bg-green-500 text-white" : ""
            }`}
            disabled={gameStarted}
          >
            {numMines}
          </button>
        ))}
      </div>
      <button
        onClick={
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > balance
            ? handleDisabledBetClick
            : handleBet
        }
        disabled={
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > balance
        }
        className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-white hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
      >
        Bet
      </button>
      {gameStarted && (
        <div>
          <p className="text-sm text-gray-400">
            {betAmount &&
              multiplier > 0 &&
              `Current Profit: ${(betAmount * multiplier).toFixed(2)}`}
          </p>
          <button
            onClick={handleCashOut}
            className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-white hover:bg-green-700 disabled:bg-gray-600"
          >
            Cash-Out
          </button>
        </div>
      )}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        result="win"
        amount={currentProfit!}
      />
    </div>
  );
}

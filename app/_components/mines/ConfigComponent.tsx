"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useConfigStore } from "@/app/_store/configStore";
import { calculateCurrentProfit, getMultiplier } from "@/app/_lib/utils";
import { useGridStore } from "@/app/_store/gridStore";
import { useCommonStore } from "@/app/_store/commonStore";
import Modal from "../ui/Modal";
import { addGameResult } from "@/app/_constants/data";
import { Gem } from "lucide-react";

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
  const { multiplier, setMultiplier, setBalance, balance } = useCommonStore();

  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = value === "" ? null : Number(value);
    setBetAmount(amount);
  };

  const handleNumMinesChange = (numMines: number) => {
    setNumberOfMines(numMines);
  };

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

  useEffect(() => {
    if (numberOfSuccessfulClicks && betAmount && numberOfMines) {
      const newProfit = getMultiplier(numberOfSuccessfulClicks, numberOfMines!);
      setMultiplier(newProfit);
      setCurrentProfit(newProfit * betAmount);
    }
  }, [betAmount, numberOfMines, numberOfSuccessfulClicks, setMultiplier]);

  const handleCashOut = () => {
    setGameStarted(false);
    clearConfigStore();
    resetGame();
    resetGrid();
    setShowModal(true);

    const finalBalance = balance! + currentProfit!;
    setBalance(finalBalance);
    addGameResult("Mines", "Win", currentProfit!, finalBalance);
  };

  const handleDisabledBetClick = () => {
    if (betAmount! > balance) {
      alert("You don’t have enough balance");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-white max-w-sm mx-auto rounded-lg">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Bet Amount</span>
        </div>
        <div className="flex p-1 bg-[#1e2a36]">
          <div className="flex-1 flex items-center">
            <input
              type="number"
              id="betAmount"
              value={betAmount !== null ? betAmount : ""}
              min={10}
              onChange={handleBetAmountChange}
              className="w-full bg-black px-3 py-3 outline-none"
              disabled={gameStarted}
            />
          </div>
          <button
            className="bg-[#1e2a36] px-4 border-gray-700"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount / 2)
            }
          >
            ½
          </button>
          <button
            className="bg-[#1e2a36] px-4  border-gray-700"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount * 2)
            }
          >
            2×
          </button>
        </div>
      </div>
      <div>
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
      <div>
        <div className="flex justify-between">
          <span className="text-gray-400">Number of Mines</span>
        </div>
      </div>
      <div className="w-full">
        <select
          value={numberOfMines || ""}
          onChange={(e) => handleNumMinesChange(Number(e.target.value))}
          disabled={gameStarted}
          className="w-full p-2 border border-gray-600 bg-black text-white focus:border-none focus:outline-none"
        >
          <option value="" disabled>
            Select number of mines
          </option>
          {[1, 3, 5, 10].map((numMines) => (
            <option key={numMines} value={numMines}>
              {numMines} {numMines === 1 ? "Mine" : "Mines"}
            </option>
          ))}
        </select>
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
        className="w-full bg-[#5cdb5c] hover:bg-[#4bc74b] disabled:bg-gray-600 disabled:text-gray-400 text-black font-medium py-4 rounded-md transition-colors"
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

"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import { useConfigStore } from "@/app/_store/configStore";
import { getMultiplier } from "@/app/_lib/utils";
import { useGridStore } from "@/app/_store/gridStore";
import { useCommonStore } from "@/app/_store/commonStore";
import Modal from "../ui/Modal";
import { addGameResult } from "@/app/_constants/data";
import { Coins } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual");

  const handleBetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = value === "" ? null : Number(value);
    setBetAmount(amount);
  };

  const handleNumMinesChange = (numMines: number) => {
    setNumberOfMines(numMines);
  };

  const handleBet = () => {
    if (betAmount === null || betAmount <= 0 || betAmount > balance!) {
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
      alert("You don't have enough balance");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 text-white max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      {/* Bet Amount */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Bet Amount</span>
          <span className="text-white">
            Balance: ${balance ? balance.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="flex bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex-1 flex items-center relative">
            <input
              type="number"
              id="betAmount"
              value={betAmount !== null ? betAmount : ""}
              min={10}
              onChange={handleBetAmountChange}
              className="w-full bg-gray-800 px-3 py-3 outline-none text-white"
              disabled={gameStarted}
              onClick={(e) => e.currentTarget.select()}
            />
            <div className="absolute right-3 pointer-events-none">
              <Coins className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <button
            className="bg-gray-800 px-6 border-l border-gray-700 hover:bg-gray-700 transition-colors text-white"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount / 2)
            }
            disabled={gameStarted}
          >
            ½
          </button>
          <button
            className="bg-gray-800 px-6 border-l border-gray-700 hover:bg-gray-700 transition-colors text-white"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount * 2)
            }
            disabled={gameStarted}
          >
            2×
          </button>
        </div>
        {betAmount! > balance && !gameStarted && (
          <p className="mt-1 text-sm font-medium text-red-500">
            Insufficient balance!
          </p>
        )}
      </div>

      {/* Number of Mines */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Mines</span>
          {numberOfMines && (
            <span className="text-green-400">
              Base Multiplier: {getMultiplier(1, numberOfMines)}x
            </span>
          )}
        </div>
        <div className="relative">
          <select
            value={numberOfMines || ""}
            onChange={(e) => handleNumMinesChange(Number(e.target.value))}
            disabled={gameStarted}
            className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg appearance-none focus:outline-none focus:border-green-500"
          >
            <option value="" disabled>
              Select number of mines
            </option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map((numMines) => (
              <option key={numMines} value={numMines}>
                {numMines} {numMines === 1 ? "Mine" : "Mines"}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Bet Button */}
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
        className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-black font-medium py-4 rounded-lg transition-colors"
      >
        {betAmount! > balance ? "Insufficient Balance" : "Bet"}
      </button>

      {/* Cash Out Section */}
      {gameStarted && (
        <div className="mt-2">
          <p className="text-sm text-gray-400">
            {betAmount &&
              multiplier > 0 &&
              `Current Profit: $${currentProfit?.toFixed(2)}`}
          </p>
          <button
            onClick={handleCashOut}
            className="w-full p-3 mt-4 rounded-lg bg-green-600 text-black font-medium hover:bg-green-500 transition-colors"
          >
            Cash-Out
          </button>
        </div>
      )}

      {/* Win Modal */}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        result="win"
        amount={currentProfit!}
        multiplier={multiplier}
      />
    </div>
  );
}

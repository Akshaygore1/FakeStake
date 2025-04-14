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
    if (betAmount === null || betAmount > balance!) {
      alert("You don't have enough balance");
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
    <div className="flex flex-col gap-6 p-4 text-white max-w-md mx-auto rounded-lg">
      {/* Bet Amount */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[#b0b9d2]">Bet Amount</span>
          <span className="text-white">
            ${balance ? balance.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="flex bg-[#1e2a36] rounded-md overflow-hidden">
          <div className="flex-1 flex items-center relative">
            <input
              type="number"
              id="betAmount"
              value={betAmount !== null ? betAmount : ""}
              min={10}
              onChange={handleBetAmountChange}
              className="w-full bg-[#1e2a36] px-3 py-3 outline-none"
              disabled={gameStarted}
              onClick={(e) => e.currentTarget.select()}
            />
            <div className="absolute right-3 pointer-events-none">
              <Coins className="w-4 h-4 text-success" />
            </div>
          </div>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount / 2)
            }
            disabled={gameStarted}
          >
            ½
          </button>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors"
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
          <span className="text-[#b0b9d2]">Mines</span>
        </div>
        <div className="relative">
          <select
            value={numberOfMines || ""}
            onChange={(e) => handleNumMinesChange(Number(e.target.value))}
            disabled={gameStarted}
            className="w-full p-3 border border-[#2c3a47] bg-[#1e2a36] text-white rounded-md appearance-none focus:outline-none"
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
        className="w-full bg-[#4cd964] hover:bg-[#3cc153] disabled:bg-[#2c3a47] disabled:text-gray-400 text-black font-medium py-4 rounded-md transition-colors"
      >
        Bet
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
            className="w-full p-3 mt-4 rounded-md bg-[#4cd964] text-black font-medium hover:bg-[#3cc153] transition-colors"
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

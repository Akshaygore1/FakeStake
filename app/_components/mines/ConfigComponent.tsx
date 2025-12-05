"use client";
import { type ChangeEvent, useEffect, useState } from "react";
import { useConfigStore } from "@/store/configStore";
import { getMultiplier } from "@/lib/utils";
import { useGridStore } from "@/store/gridStore";
import { useCommonStore } from "@/store/commonStore";
import Modal from "../ui/Modal";
import { addGameResult } from "@/lib/utils";
import GameConfig, { ConfigField } from "../GameConfig";

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

  const handleBetAmountChange = (amount: number) => {
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

  // Additional fields for mines configuration
  const additionalFields: ConfigField[] = [
    {
      id: "numberOfMines",
      label: "Mines",
      type: "select",
      value: numberOfMines || "",
      onChange: (value) => handleNumMinesChange(Number(value)),
      options: Array.from({ length: 24 }, (_, i) => ({
        label: `${i + 1} ${i + 1 === 1 ? "Mine" : "Mines"}`,
        value: i + 1,
      })),
      placeholder: "Select number of mines",
      disabled: gameStarted,
      extraInfo: numberOfMines
        ? `Base Multiplier: ${getMultiplier(1, numberOfMines)}x`
        : undefined,
    },
  ];

  // Primary button logic
  const primaryButton = !gameStarted
    ? {
        id: "bet",
        label: betAmount! > balance ? "Insufficient Balance" : "Bet",
        onClick:
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > balance
            ? handleDisabledBetClick
            : handleBet,
        disabled:
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > balance,
      }
    : undefined;

  // Cash out section as additional content
  const additionalContent = gameStarted ? (
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
  ) : null;

  // Error handling
  const error =
    betAmount! > balance && !gameStarted ? "Insufficient balance!" : "";

  return (
    <>
      <GameConfig
        betAmount={betAmount || 0}
        onBetAmountChange={handleBetAmountChange}
        betInputDisabled={gameStarted}
        additionalFields={additionalFields}
        primaryButton={primaryButton}
        additionalContent={additionalContent}
        error={error}
      />

      {/* Win Modal */}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        result="win"
        amount={currentProfit!}
        multiplier={multiplier}
      />
    </>
  );
}

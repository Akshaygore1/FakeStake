"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useConfigStore } from "@/stores/config.store";
import { getMultiplier } from "@/lib/utils";
import { useGridStore } from "@/stores/game/grid.store";
import { useCommonStore } from "@/stores/common.store";
import Modal from "@/app/_components/ui/Modal";
import { useHistoryStore } from "@/stores/history.store";
import GameConfig, { ConfigField } from "@/app/_components/GameConfig";
import { toast } from "sonner";

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
  const { addGameResult } = useHistoryStore();

  const [successfulClicks, setSuccessfulClicks] = useState(0);
  const [currentProfit, setCurrentProfit] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual");

  const handleBetAmountChange = useCallback((amount: number) => {
    setBetAmount(amount);
  }, [setBetAmount]);

  const handleNumMinesChange = useCallback((numMines: number) => {
    setNumberOfMines(numMines);
  }, [setNumberOfMines]);

  const handleBet = useCallback(() => {
    const currentBalance = balance ?? 0;
    if (betAmount === null || betAmount <= 0 || betAmount > currentBalance) {
      return;
    }

    handleSetupGame();
    setGameStarted(true);
    setSuccessfulClicks(0);
    setCurrentProfit(betAmount);
    setBalance(currentBalance - betAmount);
  }, [betAmount, balance, handleSetupGame, setGameStarted, setBalance]);

  useEffect(() => {
    if (numberOfSuccessfulClicks && betAmount && numberOfMines) {
      const newProfit = getMultiplier(numberOfSuccessfulClicks, numberOfMines);
      setMultiplier(newProfit);
      setCurrentProfit(newProfit * betAmount);
    }
  }, [betAmount, numberOfMines, numberOfSuccessfulClicks, setMultiplier]);

  const handleCashOut = useCallback(() => {
    setGameStarted(false);
    clearConfigStore();
    resetGame();
    resetGrid();
    setShowModal(true);

    const currentBalance = balance ?? 0;
    const profit = currentProfit ?? 0;
    const finalBalance = currentBalance + profit;
    setBalance(finalBalance);
    addGameResult("Mines", "Win", profit, finalBalance);
  }, [balance, currentProfit, setGameStarted, clearConfigStore, resetGame, resetGrid, setBalance, addGameResult]);

  const handleDisabledBetClick = useCallback(() => {
    const currentBalance = balance ?? 0;
    if (betAmount !== null && betAmount > currentBalance) {
      toast.error("You don't have enough balance");
    }
  }, [betAmount, balance]);

  // Additional fields for mines configuration
  const additionalFields: ConfigField[] = useMemo(() => [
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
  ], [numberOfMines, gameStarted, handleNumMinesChange]);

  // Primary button logic
  const currentBalance = balance ?? 0;
  const primaryButton = !gameStarted
    ? {
        id: "bet",
        label: (betAmount ?? 0) > currentBalance ? "Insufficient Balance" : "Bet",
        onClick:
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > currentBalance
            ? handleDisabledBetClick
            : handleBet,
        disabled:
          betAmount === null ||
          betAmount <= 0 ||
          numberOfMines <= 0 ||
          gameStarted ||
          betAmount > currentBalance,
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
    (betAmount ?? 0) > currentBalance && !gameStarted ? "Insufficient balance!" : "";

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
        amount={currentProfit ?? 0}
        multiplier={multiplier}
      />
    </>
  );
}

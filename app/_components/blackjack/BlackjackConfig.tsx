"use client";
import React, { useState, useEffect } from "react";
import { useCommonStore } from "@/app/_store/commonStore";
import { useBlackjackStore } from "@/app/_store/blackjackStore";
import { Coins } from "lucide-react";

function BlackjackConfig() {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { balance, setBalance } = useCommonStore();
  const {
    gameStatus,
    betAmount: currentBet,
    placeBet,
    newGame,
    initializeDeck,
  } = useBlackjackStore();

  // Initialize deck when component mounts
  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const handleBetAmountChange = (newValue: string) => {
    setInputValue(newValue);
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue)) {
      if (parsedValue > balance) {
        setError("Bet amount cannot exceed your balance");
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  const handleHalfAmount = () => {
    const currentAmount = parseFloat(inputValue) || 0;
    if (currentAmount > 0) {
      const newAmount = (currentAmount / 2).toFixed(2);
      setInputValue(newAmount);
      setError("");
    }
  };

  const handleDoubleAmount = () => {
    const currentAmount = parseFloat(inputValue) || 0;
    if (currentAmount > 0) {
      const newAmount = (currentAmount * 2).toFixed(2);
      if (parseFloat(newAmount) <= balance) {
        setInputValue(newAmount);
        setError("");
      } else {
        setError("Bet amount cannot exceed your balance");
      }
    }
  };

  const handleBetClick = () => {
    const betAmount = parseFloat(inputValue);
    if (
      gameStatus !== "betting" ||
      betAmount <= 0 ||
      betAmount > balance ||
      error
    )
      return;

    // Deduct bet amount from balance
    setBalance(balance - betAmount);
    placeBet(betAmount);
  };

  const handleNewGame = () => {
    // Handle winnings/losses
    if (gameStatus === "game-over") {
      const message = useBlackjackStore.getState().message;

      if (message.includes("You win") || message.includes("Dealer busted")) {
        // Player wins - add double the bet amount
        setBalance(balance + currentBet * 2);
      } else if (message.includes("Push") || message.includes("tie")) {
        // Tie - return the bet amount
        setBalance(balance + currentBet);
      }
      // For dealer wins, bet is already deducted, so no change needed
    }

    newGame();
  };

  const resetBalance = () => {
    setBalance(100000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 text-white max-w-md mx-auto rounded-lg">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[#b0b9d2]">Bet Amount</span>
          <span className="text-white">
            Balance: ${balance ? balance.toFixed(2) : "0.00"}
          </span>
        </div>
      </div>
      <div className="flex bg-[#1e2a36] rounded-md overflow-hidden">
        <div className="flex-1 flex items-center relative">
          <input
            type="number"
            id="betAmount"
            value={inputValue}
            min={0.01}
            step={0.01}
            onChange={(e) => handleBetAmountChange(e.target.value)}
            className="w-full bg-[#1e2a36] px-3 py-3 outline-none text-white"
            onClick={(e) => e.currentTarget.select()}
          />
          <div className="absolute right-3 pointer-events-none">
            <Coins className="w-4 h-4 text-success" />
          </div>
        </div>
        <button
          className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white"
          onClick={handleHalfAmount}
          disabled={!inputValue || parseFloat(inputValue) <= 0}
        >
          ½
        </button>
        <button
          className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white"
          onClick={handleDoubleAmount}
          disabled={
            !inputValue ||
            parseFloat(inputValue) <= 0 ||
            parseFloat(inputValue) * 2 > balance
          }
        >
          2×
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {gameStatus === "betting" && (
        <button
          onClick={handleBetClick}
          className="w-full py-3 rounded-md bg-success text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={
            !inputValue ||
            parseFloat(inputValue) <= 0 ||
            parseFloat(inputValue) > balance ||
            !!error
          }
        >
          {parseFloat(inputValue || "0") > balance
            ? "Insufficient Balance"
            : "Deal Cards"}
        </button>
      )}

      {gameStatus === "game-over" && (
        <button
          onClick={handleNewGame}
          className="w-full py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
        >
          New Game
        </button>
      )}
    </div>
  );
}

export default BlackjackConfig;

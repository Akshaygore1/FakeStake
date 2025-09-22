"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommonStore } from "@/app/_store/commonStore";
import { useBlackjackStore } from "@/app/_store/blackjackStore";

function BlackjackConfig() {
  const [betAmount, setBetAmount] = useState(1000);
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

  const handleBetClick = () => {
    if (gameStatus !== "betting" || betAmount <= 0 || betAmount > balance)
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
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Blackjack</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Balance</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-400">
              {balance.toLocaleString()}
            </span>
            <Button
              onClick={resetBalance}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Reset
            </Button>
          </div>
        </div>

        {gameStatus === "betting" && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Place Bet</h3>
            <div className="space-y-4">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                min="1"
                max={balance}
              />
              <Button
                onClick={handleBetClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Deal Cards
              </Button>
            </div>
          </div>
        )}

        {gameStatus === "game-over" && (
          <div className="space-y-4">
            <Button
              onClick={handleNewGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              New Game
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BlackjackConfig;

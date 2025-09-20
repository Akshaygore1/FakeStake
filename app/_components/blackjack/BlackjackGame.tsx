"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type BlackjackGameProps = {
  playerHand: number[];
  dealerHand: number[];
  playerScore: number;
  dealerScore: number;
  gameStatus: "betting" | "player-turn" | "dealer-turn" | "game-over";
  message: string;
  onHit: () => void;
  onStand: () => void;
};

function BlackjackGame({
  playerHand,
  dealerHand,
  playerScore,
  dealerScore,
  gameStatus,
  message,
  onHit,
  onStand
}: BlackjackGameProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Blackjack</h2>
        <p className="text-gray-300 mt-2">{message}</p>
      </div>

      {/* Dealer's hand */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Dealer</h3>
        <div className="flex flex-wrap gap-2">
          {dealerHand.map((card, index) => (
            <div 
              key={index} 
              className="w-16 h-24 bg-white rounded flex items-center justify-center text-black font-bold"
            >
              {gameStatus === "player-turn" && index === 1 ? "?" : card}
            </div>
          ))}
        </div>
        <p className="text-white mt-2">Score: {gameStatus === "player-turn" ? dealerScore : calculateScore(dealerHand)}</p>
      </div>

      {/* Player's hand */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Player</h3>
        <div className="flex flex-wrap gap-2">
          {playerHand.map((card, index) => (
            <div 
              key={index} 
              className="w-16 h-24 bg-white rounded flex items-center justify-center text-black font-bold"
            >
              {card}
            </div>
          ))}
        </div>
        <p className="text-white mt-2">Score: {playerScore}</p>
      </div>

      {/* Game controls */}
      <div className="flex gap-4 justify-center">
        {gameStatus === "player-turn" && (
          <>
            <Button onClick={onHit} className="bg-green-600 hover:bg-green-700">
              Hit
            </Button>
            <Button onClick={onStand} className="bg-red-600 hover:bg-red-700">
              Stand
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

const calculateScore = (hand: number[]) => {
  return hand.reduce((sum, card) => sum + card, 0);
};

export default BlackjackGame;
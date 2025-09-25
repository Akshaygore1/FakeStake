"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useBlackjackStore } from "@/app/_store/blackjackStore";
import { PlayingCard } from "@/app/_components/PlayingCard";

function BlackjackGame() {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gameStatus,
    message,
    playerHit,
    playerStand,
  } = useBlackjackStore();

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
          {dealerHand.map((card, index) =>
            gameStatus === "player-turn" && index === 1 ? (
              <div
                key={index}
                className="w-24 h-36 bg-[#1e2a36] border-2 border-[#2c3a47] rounded-lg flex items-center justify-center"
              >
                <span className="text-4xl text-white">?</span>
              </div>
            ) : (
              <PlayingCard key={index} card={card} />
            )
          )}
        </div>
        <p className="text-white mt-2">Score: {dealerScore}</p>
      </div>

      {/* Player's hand */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Player</h3>
        <div className="flex flex-wrap gap-2">
          {playerHand.map((card, index) => (
            <PlayingCard key={index} card={card} />
          ))}
        </div>
        <p className="text-white mt-2">Score: {playerScore}</p>
      </div>

      {/* Game controls */}
      <div className="flex gap-4 justify-center">
        {gameStatus === "player-turn" && (
          <>
            <Button
              onClick={playerHit}
              className="bg-green-600 hover:bg-green-700"
            >
              Hit
            </Button>
            <Button
              onClick={playerStand}
              className="bg-red-600 hover:bg-red-700"
            >
              Stand
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default BlackjackGame;

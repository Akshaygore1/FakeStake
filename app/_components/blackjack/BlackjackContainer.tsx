"use client";
import { useState } from "react";
import BlackjackGame from "./BlackjackGame";
import BlackjackConfig from "./BlackjackConfig";
import { useCommonStore } from "@/app/_store/commonStore";

function BlackjackContainer() {
  const { balance, setBalance } = useCommonStore();
  const [gameState, setGameState] = useState({
    playerHand: [] as number[],
    dealerHand: [] as number[],
    gameStatus: "betting" as "betting" | "player-turn" | "dealer-turn" | "game-over",
    playerScore: 0,
    dealerScore: 0,
    betAmount: 0,
    message: "Place your bet to start the game"
  });

  const handleBet = (amount: number) => {
    // Validate bet amount
    if (amount <= 0 || amount > balance) {
      return;
    }

    // Deduct bet amount upfront
    const newBalance = balance - amount;
    setBalance(newBalance);

    // Initialize a new game
    const newPlayerHand = [drawCard(), drawCard()];
    const newDealerHand = [drawCard(), drawCard()];
    
    setGameState({
      playerHand: newPlayerHand,
      dealerHand: newDealerHand,
      gameStatus: "player-turn",
      playerScore: calculateScore(newPlayerHand),
      dealerScore: calculateScore([newDealerHand[0]]), // Only show first card for dealer
      betAmount: amount,
      message: "Your turn - Hit or Stand?"
    });
  };

  const drawCard = () => {
    // Card values: 1-13 (Ace=1, Jack=11, Queen=12, King=13)
    // For simplicity, we'll treat Ace as 11 and face cards as 10
    const card = Math.floor(Math.random() * 13) + 1;
    if (card === 1) return 11; // Ace
    if (card >= 10) return 10; // Face cards
    return card;
  };

  const calculateScore = (hand: number[]) => {
    return hand.reduce((sum, card) => sum + card, 0);
  };

  const handleHit = () => {
    if (gameState.gameStatus !== "player-turn") return;
    
    const newPlayerHand = [...gameState.playerHand, drawCard()];
    const newPlayerScore = calculateScore(newPlayerHand);
    
    if (newPlayerScore > 21) {
      // Player busts
      setGameState({
        ...gameState,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
        gameStatus: "game-over",
        message: "You busted! Dealer wins."
      });
    } else {
      setGameState({
        ...gameState,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
        message: "Your turn - Hit or Stand?"
      });
    }
  };

  const handleStand = () => {
    if (gameState.gameStatus !== "player-turn") return;
    
    // Reveal dealer's hidden card
    const fullDealerScore = calculateScore(gameState.dealerHand);
    setGameState({
      ...gameState,
      dealerScore: fullDealerScore,
      gameStatus: "dealer-turn",
      message: "Dealer's turn..."
    });
    
    // Dealer draws until 17 or higher
    setTimeout(() => {
      let currentDealerHand = [...gameState.dealerHand];
      let currentDealerScore = fullDealerScore;
      
      while (currentDealerScore < 17) {
        currentDealerHand = [...currentDealerHand, drawCard()];
        currentDealerScore = calculateScore(currentDealerHand);
      }
      
      // Determine winner
      const playerScore = gameState.playerScore;
      let message = "";
      let newBalance = balance;
      
      if (currentDealerScore > 21) {
        // Dealer busts
        message = "Dealer busted! You win!";
        newBalance = balance + gameState.betAmount * 2;
        setBalance(newBalance);
      } else if (playerScore > currentDealerScore) {
        // Player wins
        message = "You win!";
        newBalance = balance + gameState.betAmount * 2;
        setBalance(newBalance);
      } else if (playerScore < currentDealerScore) {
        // Dealer wins
        message = "Dealer wins!";
      } else {
        // Tie
        message = "Push! It's a tie.";
        newBalance = balance + gameState.betAmount;
        setBalance(newBalance);
      }
      
      setGameState({
        ...gameState,
        dealerHand: currentDealerHand,
        dealerScore: currentDealerScore,
        gameStatus: "game-over",
        message
      });
    }, 1000);
  };

  const handleNewGame = () => {
    setGameState({
      playerHand: [],
      dealerHand: [],
      gameStatus: "betting",
      playerScore: 0,
      dealerScore: 0,
      betAmount: 0,
      message: "Place your bet to start the game"
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 bg-primary">
        <BlackjackConfig 
          onBet={handleBet} 
          onNewGame={handleNewGame}
          gameStatus={gameState.gameStatus}
          balance={balance}
        />
      </div>
      <div className="w-full md:w-2/3">
        <BlackjackGame 
          playerHand={gameState.playerHand}
          dealerHand={gameState.dealerHand}
          playerScore={gameState.playerScore}
          dealerScore={gameState.dealerScore}
          gameStatus={gameState.gameStatus}
          message={gameState.message}
          onHit={handleHit}
          onStand={handleStand}
        />
      </div>
    </div>
  );
}

export default BlackjackContainer;
"use client";
import { useCommonStore } from "@/store/commonStore";
import React, { useCallback } from "react";
import { useSnakeStore, Difficulty } from "@/store/snakeStore";
import GameConfig, { ConfigField } from "../GameConfig";
import {
  difficultyOptions,
  calculateNextPathIndex,
  getTileAtPathIndex,
  getMultiplierValue,
  isSnakeTile,
  getIntermediatePathIndices,
  PATH_INDICES,
} from "./snakeUtils";

function SnakeConfig() {
  const {
    isPlaying,
    setIsPlaying,
    setBetAmount,
    betAmount,
    difficulty,
    setDifficulty,
    gameOver,
    setGameOver,
    hasWon,
    setHasWon,
    currentMultiplier,
    setCurrentMultiplier,
    winnings,
    setWinnings,
    diceValues,
    setDiceValues,
    isRolling,
    setIsRolling,
    currentPathIndex,
    setCurrentPathIndex,
    pathHistory,
    setPathHistory,
    addToPathHistory,
    isAnimating,
    setIsAnimating,
    resetGame,
  } = useSnakeStore();
  const { balance, setBalance } = useCommonStore();
  const [error, setError] = React.useState<string>("");
  const [hasBet, setHasBet] = React.useState(false);

  const handleBetAmountChange = (newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const handleDifficultyChange = (newValue: string) => {
    setDifficulty(newValue as Difficulty);
  };

  // Place bet and start the game
  const handlePlaceBet = useCallback(() => {
    if (betAmount <= 0 || betAmount > balance) return;

    // Deduct bet from balance
    setBalance(balance - betAmount);
    setHasBet(true);
    setIsPlaying(true);
    setGameOver(false);
    setHasWon(false);
    setCurrentMultiplier(1);
    setWinnings(betAmount);
    setCurrentPathIndex(0);
    setPathHistory([0]);
  }, [
    betAmount,
    balance,
    setBalance,
    setIsPlaying,
    setGameOver,
    setHasWon,
    setCurrentMultiplier,
    setWinnings,
    setCurrentPathIndex,
    setPathHistory,
  ]);

  // Roll the dice
  const handleRollDice = useCallback(async () => {
    if (isRolling || isAnimating || gameOver) return;

    setIsRolling(true);

    // Animate dice rolling with random values
    const rollDuration = 1000;
    const rollInterval = 100;
    const rolls = rollDuration / rollInterval;

    for (let i = 0; i < rolls; i++) {
      await new Promise((resolve) => setTimeout(resolve, rollInterval));
      const tempDice1 = Math.floor(Math.random() * 6) + 1;
      const tempDice2 = Math.floor(Math.random() * 6) + 1;
      setDiceValues([tempDice1, tempDice2]);
    }

    // Final dice values
    const finalDice1 = Math.floor(Math.random() * 6) + 1;
    const finalDice2 = Math.floor(Math.random() * 6) + 1;
    const diceSum = finalDice1 + finalDice2;
    setDiceValues([finalDice1, finalDice2]);
    setIsRolling(false);

    // Calculate new position
    const newPathIndex = calculateNextPathIndex(currentPathIndex, diceSum);

    // Start animation
    setIsAnimating(true);

    // Get all intermediate positions to animate through
    const intermediateIndices = getIntermediatePathIndices(
      currentPathIndex,
      newPathIndex
    );
    console.log("intermediateIndices", intermediateIndices);
    // Animate through each position
    let hitSnake = false;
    for (const pathIdx of intermediateIndices) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Animation delay per tile

      // Check if this tile is a snake
      if (isSnakeTile(difficulty, pathIdx)) {
        hitSnake = true;
        setCurrentPathIndex(pathIdx);
        addToPathHistory(pathIdx);
        break;
      }

      // Update position
      setCurrentPathIndex(pathIdx);
      addToPathHistory(pathIdx);

      // Calculate multiplier if it's a multiplier tile
      const tile = getTileAtPathIndex(difficulty, pathIdx);
      if (tile?.type === "multiplier") {
        const tileMultiplier = getMultiplierValue(tile);
        setCurrentMultiplier(tileMultiplier);
        setWinnings(betAmount * tileMultiplier);
      }
    }

    setIsAnimating(false);

    // Check game result
    if (hitSnake) {
      // Player loses
      setGameOver(true);
      setHasWon(false);
      setWinnings(0);
    } else if (newPathIndex >= PATH_INDICES.length - 1) {
      // Player reached the end - auto cash out
      handleCashOut();
    }
  }, [
    isRolling,
    isAnimating,
    gameOver,
    currentPathIndex,
    currentMultiplier,
    betAmount,
    difficulty,
    setIsRolling,
    setDiceValues,
    setIsAnimating,
    setCurrentPathIndex,
    addToPathHistory,
    setCurrentMultiplier,
    setWinnings,
    setGameOver,
    setHasWon,
  ]);

  // Cash out winnings
  const handleCashOut = useCallback(() => {
    if (!isPlaying || gameOver) return;

    const finalWinnings = betAmount * currentMultiplier;
    setBalance(balance + finalWinnings);
    setWinnings(finalWinnings);
    setGameOver(true);
    setHasWon(true);
  }, [
    isPlaying,
    gameOver,
    betAmount,
    currentMultiplier,
    balance,
    setBalance,
    setWinnings,
    setGameOver,
    setHasWon,
  ]);

  // Play again - reset the game
  const handlePlayAgain = useCallback(() => {
    resetGame();
    setHasBet(false);
  }, [resetGame]);

  const additionalFields: ConfigField[] = [
    {
      id: "difficulty",
      label: "Difficulty",
      type: "select",
      value: difficulty,
      onChange: handleDifficultyChange,
      options: difficultyOptions,
      disabled: isPlaying,
    },
  ];

  // Dynamic buttons based on game state
  const getButtonConfig = () => {
    if (gameOver) {
      // Game is over - show play again button
      return {
        primaryButton: {
          id: "playAgain",
          label: hasWon
            ? `Won $${winnings.toFixed(2)}! Play Again`
            : "You Lost! Play Again",
          onClick: handlePlayAgain,
          disabled: false,
          variant: hasWon ? ("primary" as const) : ("danger" as const),
        },
        secondaryButtons: [],
      };
    }

    if (!hasBet) {
      // Initial state - show bet button
      return {
        primaryButton: {
          id: "bet",
          label:
            betAmount > balance
              ? "Insufficient Balance"
              : betAmount <= 0
              ? "Enter Bet Amount"
              : "Place Bet",
          onClick: handlePlaceBet,
          disabled:
            !betAmount || betAmount <= 0 || betAmount > balance || error !== "",
        },
        secondaryButtons: [],
      };
    }

    // Playing state - show roll and cash out buttons
    return {
      primaryButton: {
        id: "roll",
        label: isRolling
          ? "Rolling..."
          : isAnimating
          ? "Moving..."
          : "Roll Dice",
        onClick: handleRollDice,
        disabled: isRolling || isAnimating,
        loading: isRolling || isAnimating,
        loadingText: isRolling ? "Rolling..." : "Moving...",
      },
      secondaryButtons: [
        {
          id: "cashout",
          label: `Cash Out $${(betAmount * currentMultiplier).toFixed(2)}`,
          onClick: handleCashOut,
          disabled: isRolling || isAnimating || currentPathIndex === 0,
          variant: "secondary" as const,
        },
      ],
    };
  };

  const { primaryButton, secondaryButtons } = getButtonConfig();

  // Custom status display for winnings
  const statusDisplay = isPlaying ? (
    <div className="bg-[#1e2a36] rounded-lg p-4 mb-2">
      <div className="flex justify-between items-center">
        <span className="text-[#b0b9d2]">Current Multiplier</span>
        <span className="text-green-400 font-bold text-xl">
          {currentMultiplier.toFixed(2)}x
        </span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-[#b0b9d2]">Potential Win</span>
        <span className="text-white font-bold">
          ${(betAmount * currentMultiplier).toFixed(2)}
        </span>
      </div>
      {diceValues[0] + diceValues[1] > 0 && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#b0b9d2]">Last Roll</span>
          <span className="text-amber-400 font-bold">
            {diceValues[0]} + {diceValues[1]} = {diceValues[0] + diceValues[1]}
          </span>
        </div>
      )}
    </div>
  ) : null;

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      additionalFields={additionalFields}
      error={error}
      primaryButton={primaryButton}
      secondaryButtons={secondaryButtons}
      betInputDisabled={isPlaying}
      customStatusDisplay={statusDisplay}
    />
  );
}

export default SnakeConfig;

"use client";
import { useCommonStore } from "@/stores/common.store";
import React, { useCallback } from "react";
import { useSnakeStore, Difficulty } from "@/stores/game/snake.store";
import GameConfig, { ConfigField } from "@/app/_components/GameConfig";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    console.log("newPathIndex", newPathIndex);
    // Start animation
    setIsAnimating(true);

    // Get all intermediate positions to animate through
    const intermediateIndices = getIntermediatePathIndices(
      currentPathIndex,
      newPathIndex
    );
    console.log("intermediateIndices", intermediateIndices);
    // Animate through each position
    for (const pathIdx of intermediateIndices) {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Animation delay per tile

      // Check if this tile is a snake
      console.log("======", isSnakeTile(difficulty, pathIdx));
      if (isSnakeTile(difficulty, pathIdx)) {
        setCurrentPathIndex(pathIdx);
        addToPathHistory(pathIdx);
        // break;
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
    const hitSnake = isSnakeTile(
      difficulty,
      intermediateIndices[intermediateIndices.length - 1]
    );
    // Check game result
    if (hitSnake) {
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
      type: "custom",
      value: difficulty,
      onChange: handleDifficultyChange,
      customComponent: (
        <Select
          value={difficulty}
          onValueChange={handleDifficultyChange}
          disabled={isPlaying}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Difficulty</SelectLabel>
              {difficultyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
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

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      additionalFields={additionalFields}
      error={error}
      primaryButton={primaryButton}
      secondaryButtons={secondaryButtons}
      betInputDisabled={isPlaying}
    />
  );
}

export default SnakeConfig;

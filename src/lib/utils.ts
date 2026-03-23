import type { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ASSET_BASE_URL } from "@/config/site";

export interface GameResult {
  gameName: string | ReactNode;
  result: string;
  amount: number;
  finalBalance: number | ReactNode;
}

export const url = ASSET_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWeightedRandom() {
  const randomCheck = Math.random();
  if (randomCheck <= 0.95) {
    return Math.random() * 2 + 1;
  } else {
    return Math.floor(Math.random() * 98) + 2;
  }
}

export function calculateWinningAmount(
  betAmount: number,
  numberOfMines: number
): number {
  const totalTiles = 25;
  const k = 1.5; // Scaling factor, adjust based on game balance
  const multiplier = Math.pow(totalTiles / (totalTiles - numberOfMines), k);
  const winningAmount = betAmount * multiplier;
  return winningAmount;
}

export function calculatePerMineMultiplier(numberOfMines: number): number {
  const totalTiles = 25;
  if (numberOfMines === 0) {
    return 1;
  }
  const k = 1.5; // Scaling factor
  const totalMultiplier = Math.pow(
    totalTiles / (totalTiles - numberOfMines),
    k
  );
  const perMineMultiplier = totalMultiplier / numberOfMines;
  return perMineMultiplier;
}

export function calculateBaseMultiplier(numberOfMines: number): number {
  const baseMultiplier = 1 + numberOfMines * 0.1;
  return baseMultiplier;
}

export function calculateCurrentProfit(
  betAmount: number,
  numberOfMines: number,
  numberOfSuccessfulClicks: number
): number {
  const baseMultiplier = calculateBaseMultiplier(numberOfMines);
  const multiplier = Math.pow(baseMultiplier, numberOfSuccessfulClicks);
  const profit = betAmount * multiplier;
  return profit;
}

export function calculateMultiplier(
  selectedTiles: number,
  mines: number
): number {
  const TOTAL_TILES = 25;
  const HOUSE_EDGE = 0.03; // 3% house edge

  if (
    selectedTiles < 1 ||
    selectedTiles > 24 ||
    mines < 1 ||
    mines > TOTAL_TILES - selectedTiles
  ) {
    throw new Error("Invalid number of selected tiles or mines");
  }

  let cumulativeMultiplier = 1;

  for (let i = 0; i < selectedTiles; i++) {
    const remainingSafeTiles = TOTAL_TILES - mines - i;
    const remainingTotalTiles = TOTAL_TILES - i;
    const safeProbability = remainingSafeTiles / remainingTotalTiles;
    cumulativeMultiplier *= 1 / safeProbability;
  }

  const finalMultiplier = cumulativeMultiplier * (1 - HOUSE_EDGE);

  return Number(finalMultiplier.toFixed(2));
}

export function getMultiplier(selectedTiles: number, mines: number): number {
  return calculateMultiplier(selectedTiles, mines);
}

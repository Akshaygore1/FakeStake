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
  const BASE_MULTIPLIER = 1.03;
  const RISK_FACTOR = 1.2;

  if (
    selectedTiles < 1 ||
    selectedTiles > 24 ||
    mines < 1 ||
    mines > TOTAL_TILES - selectedTiles
  ) {
    throw new Error("Invalid number of selected tiles or mines");
  }

  // Calculate probability-based multiplier
  const probability = 1 - mines / (TOTAL_TILES - selectedTiles + 1);
  const baseMultiplier = BASE_MULTIPLIER + (1 - probability) * RISK_FACTOR;

  // Apply exponential scaling based on selected tiles and mines
  const multiplier =
    Math.pow(baseMultiplier, selectedTiles) *
    Math.pow(1 + mines / TOTAL_TILES, selectedTiles);

  // Round to 2 decimal places
  return Number(multiplier.toFixed(2));
}

export function getMultiplier(selectedTiles: number, mines: number): number {
  return calculateMultiplier(selectedTiles, mines);
}

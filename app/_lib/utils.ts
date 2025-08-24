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

  // Calculate the cumulative multiplier based on probability at each step
  let cumulativeMultiplier = 1;

  for (let i = 0; i < selectedTiles; i++) {
    // Remaining safe tiles after i successful selections
    const remainingSafeTiles = TOTAL_TILES - mines - i;
    // Total remaining tiles after i selections
    const remainingTotalTiles = TOTAL_TILES - i;

    // Probability of selecting a safe tile at this step
    const safeProbability = remainingSafeTiles / remainingTotalTiles;

    // Fair multiplier is 1/probability
    cumulativeMultiplier *= 1 / safeProbability;
  }

  // Apply overall house edge at the end
  const finalMultiplier = cumulativeMultiplier * (1 - HOUSE_EDGE);

  // Round to 2 decimal places
  return Number(finalMultiplier.toFixed(2));
}

export function getMultiplier(selectedTiles: number, mines: number): number {
  return calculateMultiplier(selectedTiles, mines);
}

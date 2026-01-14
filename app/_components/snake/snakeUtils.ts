import { Difficulty } from "@/store/snakeStore";

export type GridItem = {
  type: "play" | "multiplier" | "dice" | "snake";
  value?: string;
  active?: boolean;
};

// Configuration for each difficulty level
export const difficultyConfig: Record<
  Difficulty,
  {
    multipliers: string[];
    multiplierPositions: number[];
    dicePositions: number[];
    snakePositions: number[];
    playActive?: boolean;
  }
> = {
  easy: {
    multipliers: [
      "2.00x",
      "1.30x",
      "1.20x",
      "2.00x",
      "1.10x",
      "1.30x",
      "1.01x",
      "1.20x",
      "1.10x",
      "1.01x",
    ],
    multiplierPositions: [1, 2, 3, 4, 7, 8, 11, 12, 13, 14],
    dicePositions: [5, 6, 9, 10],
    snakePositions: [15],
    playActive: false,
  },
  medium: {
    multipliers: [
      "4.00x",
      "2.50x",
      "1.40x",
      "4.00x",
      "1.11x",
      "2.50x",
      "1.40x",
      "1.11x",
    ],
    multiplierPositions: [1, 2, 3, 4, 7, 8, 12, 13],
    dicePositions: [5, 6, 9, 10],
    snakePositions: [11, 14, 15],
    playActive: true,
  },
  hard: {
    multipliers: ["7.50x", "3.00x", "1.38x", "7.50x", "3.00x", "1.38x"],
    multiplierPositions: [1, 2, 3, 4, 8, 12],
    dicePositions: [5, 6, 9, 10],
    snakePositions: [7, 11, 13, 14, 15],
    playActive: true,
  },
  expert: {
    multipliers: ["10.00x", "3.82x", "10.00x", "3.82x"],
    multiplierPositions: [1, 2, 4, 8],
    dicePositions: [5, 6, 9, 10],
    snakePositions: [3, 7, 11, 12, 13, 14, 15],
    playActive: true,
  },
  master: {
    multipliers: ["17.64x", "17.64x"],
    multiplierPositions: [1, 4],
    dicePositions: [5, 6, 9, 10],
    snakePositions: [2, 3, 7, 8, 11, 12, 13, 14, 15],
    playActive: true,
  },
};

// Function to generate grid data dynamically
export const generateGridData = (difficulty: Difficulty): GridItem[] => {
  const config = difficultyConfig[difficulty];
  const grid: GridItem[] = new Array(16).fill(null);

  // Set play at position 0
  grid[0] = config.playActive
    ? { type: "play", active: true }
    : { type: "play" };

  // Set multipliers at their positions
  config.multiplierPositions.forEach((pos, idx) => {
    const isActiveMultiplier = difficulty === "easy" && pos === 1;
    grid[pos] = {
      type: "multiplier",
      value: config.multipliers[idx],
      ...(isActiveMultiplier && { active: true }),
    };
  });

  // Set dice at their positions
  config.dicePositions.forEach((pos) => {
    grid[pos] = { type: "dice" };
  });

  // Set snakes at their positions
  config.snakePositions.forEach((pos) => {
    grid[pos] = { type: "snake" };
  });

  return grid;
};

// Generate grid data for all difficulties
export const gridData: Record<Difficulty, GridItem[]> = {
  easy: generateGridData("easy"),
  medium: generateGridData("medium"),
  hard: generateGridData("hard"),
  expert: generateGridData("expert"),
  master: generateGridData("master"),
};

// Difficulty options for select dropdown
export const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
  { label: "Expert", value: "expert" },
  { label: "Master", value: "master" },
];

// ============================================
// PATH CALCULATION UTILITIES
// ============================================

/**
 * Snake pattern path on 4x4 grid (excluding center dice tiles 5, 6, 9, 10)
 * Path order: 0→1→2→3→7→11→15→14→13→12→8→4
 *
 * Visual:
 * [0] → [1] → [2] → [3]
 *                     ↓
 * [4] ← [CENTER] ← [7]
 *  ↑
 * [8] → [CENTER] → [11]
 *                     ↓
 * [12] ← [13] ← [14] ← [15]
 */
export const PATH_INDICES = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4];

// Center dice positions (not part of path)
export const CENTER_POSITIONS = [5, 6, 9, 10];

/**
 * Get the grid index for a given path position
 */
export const getGridIndexFromPathIndex = (pathIndex: number): number => {
  if (pathIndex < 0 || pathIndex >= PATH_INDICES.length) {
    return PATH_INDICES[PATH_INDICES.length - 1]; // Return last position if out of bounds
  }
  return PATH_INDICES[pathIndex];
};

/**
 * Get the path index for a given grid position
 */
export const getPathIndexFromGridIndex = (gridIndex: number): number => {
  return PATH_INDICES.indexOf(gridIndex);
};

/**
 * Calculate the new path index after rolling dice
 * Returns the new path index or -1 if would go out of bounds (win condition)
 */
export const calculateNextPathIndex = (
  currentPathIndex: number,
  diceSum: number
): number => {
  const newPathIndex = currentPathIndex + diceSum;
  if (newPathIndex >= PATH_INDICES.length) {
    // Player went past the end - they complete the path (auto cash out)
    return PATH_INDICES.length - 1;
  }
  return newPathIndex;
};

/**
 * Check if a move would complete the path (reach or pass the end)
 */
export const wouldCompleteThePath = (
  currentPathIndex: number,
  diceSum: number
): boolean => {
  return currentPathIndex + diceSum >= PATH_INDICES.length;
};

/**
 * Get the GridItem at a specific path index
 */
export const getTileAtPathIndex = (
  difficulty: Difficulty,
  pathIndex: number
): GridItem | null => {
  const gridIndex = getGridIndexFromPathIndex(pathIndex);
  return gridData[difficulty][gridIndex] || null;
};

/**
 * Get the multiplier value from a tile (returns 1 if not a multiplier tile)
 */
export const getMultiplierValue = (tile: GridItem | null): number => {
  if (!tile || tile.type !== "multiplier" || !tile.value) {
    return 1;
  }
  // Parse "2.00x" -> 2.00
  return parseFloat(tile.value.replace("x", ""));
};

/**
 * Check if the tile at a path index is a snake
 */
export const isSnakeTile = (
  difficulty: Difficulty,
  pathIndex: number
): boolean => {
  const tile = getTileAtPathIndex(difficulty, pathIndex);
  return tile?.type === "snake";
};

/**
 * Get the row and column for a grid index
 */
export const getGridPosition = (
  gridIndex: number
): { row: number; col: number } => {
  return {
    row: Math.floor(gridIndex / 4),
    col: gridIndex % 4,
  };
};

/**
 * Get all intermediate path indices between start and end (exclusive of start, inclusive of end)
 */
export const getIntermediatePathIndices = (
  startPathIndex: number,
  endPathIndex: number
): number[] => {
  const indices: number[] = [];
  for (let i = startPathIndex + 1; i <= endPathIndex; i++) {
    if (i < PATH_INDICES.length) {
      indices.push(i);
    }
  }
  return indices;
};

/**
 * Calculate total multiplier from all tiles visited in the path
 */
export const calculateTotalMultiplier = (
  difficulty: Difficulty,
  pathHistory: number[]
): number => {
  let total = 1;
  for (const pathIndex of pathHistory) {
    const tile = getTileAtPathIndex(difficulty, pathIndex);
    if (tile?.type === "multiplier") {
      total *= getMultiplierValue(tile);
    }
  }
  return total;
};

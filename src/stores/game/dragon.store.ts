import { create } from "zustand";
import { useCommonStore } from "../common.store";

type Difficulty = "easy" | "medium" | "hard";

type CellState = "hidden" | "egg" | "empty";

type DragonState = {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentRow: number;
  setCurrentRow: (row: number) => void;
  grid: CellState[][];
  skullPositions: number[]; // Which column has the skull for each row (rest are eggs)
  revealedCells: boolean[][];
  multiplier: number;
  completedRows: number;
  initGame: () => void;
  revealCell: (row: number, col: number) => boolean; // Returns true if egg found
  resetGame: () => void;
  cashout: () => number; // Returns winnings
};

const ROWS = 9;

const getColsForDifficulty = (difficulty: Difficulty) => {
  return difficulty === "easy" ? 4 : difficulty === "medium" ? 3 : 2;
};

// Generate skull positions - one skull per row, rest are eggs
const generateSkullPositions = (rows: number, cols: number): number[] => {
  return Array.from({ length: rows }, () => Math.floor(Math.random() * cols));
};

const createEmptyRevealedGrid = (rows: number, cols: number): boolean[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};

// Calculate multiplier based on difficulty and rows completed
// Easy: 4 cols, 3 eggs, 1 skull -> 4/3 = 1.33x per row
// Medium: 3 cols, 2 eggs, 1 skull -> 3/2 = 1.5x per row
// Hard: 2 cols, 1 egg, 1 skull -> 2/1 = 2x per row
const getMultiplierPerRow = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "easy":
      return 1.31;
    case "medium":
      return 1.47;
    case "hard":
      return 1.96;
  }
};

const calculateMultiplier = (
  difficulty: Difficulty,
  completedRows: number
): number => {
  if (completedRows === 0) return 1;
  const perRow = getMultiplierPerRow(difficulty);
  return Math.round(Math.pow(perRow, completedRows) * 100) / 100;
};

export const useDragonStore = create<DragonState>((set, get) => ({
  betAmount: 10,
  setBetAmount: (amount) => set({ betAmount: amount }),
  difficulty: "easy",
  setDifficulty: (difficulty) => {
    set({ difficulty });
    get().initGame();
  },
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  currentRow: ROWS - 1, // Start from bottom row
  setCurrentRow: (row) => set({ currentRow: row }),
  grid: [],
  skullPositions: [],
  revealedCells: [],
  multiplier: 1,
  completedRows: 0,
  initGame: () => {
    const { difficulty } = get();
    const cols = getColsForDifficulty(difficulty);
    const skullPositions = generateSkullPositions(ROWS, cols);
    const revealedCells = createEmptyRevealedGrid(ROWS, cols);
    set({
      skullPositions,
      revealedCells,
      currentRow: ROWS - 1,
      isPlaying: false,
      multiplier: 1,
      completedRows: 0,
    });
  },
  revealCell: (row: number, col: number) => {
    const {
      skullPositions,
      revealedCells,
      currentRow,
      difficulty,
      completedRows,
    } = get();

    // Can only reveal cells in the current row
    if (row !== currentRow) return false;

    const newRevealedCells = revealedCells.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? true : c)) : [...r]
    );

    // Cell is an egg if it's NOT the skull position
    const isEgg = skullPositions[row] !== col;

    if (isEgg) {
      // Move to next row (going up)
      const newCompletedRows = completedRows + 1;
      const newMultiplier = calculateMultiplier(difficulty, newCompletedRows);
      set({
        revealedCells: newRevealedCells,
        currentRow: currentRow - 1,
        completedRows: newCompletedRows,
        multiplier: newMultiplier,
      });
    } else {
      // Game over - reveal ALL cells in the entire grid
      const fullyRevealedGrid = revealedCells.map((r) => r.map(() => true));
      set({
        revealedCells: fullyRevealedGrid,
        isPlaying: false,
        multiplier: 0,
      });
    }

    return isEgg;
  },
  cashout: () => {
    const { betAmount, multiplier, difficulty } = get();
    const cols = getColsForDifficulty(difficulty);
    const winnings = Math.round(betAmount * multiplier * 100) / 100;

    // Add winnings to balance
    const { balance, setBalance } = useCommonStore.getState();
    setBalance(balance + winnings);

    // Reset game state
    set({
      skullPositions: [],
      revealedCells: createEmptyRevealedGrid(ROWS, cols),
      currentRow: ROWS - 1,
      isPlaying: false,
      multiplier: 1,
      completedRows: 0,
    });

    return winnings;
  },
  resetGame: () => {
    const { difficulty } = get();
    const cols = getColsForDifficulty(difficulty);
    set({
      skullPositions: [],
      revealedCells: createEmptyRevealedGrid(ROWS, cols),
      currentRow: ROWS - 1,
      isPlaying: false,
      multiplier: 1,
      completedRows: 0,
    });
  },
}));

import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard" | "expert" | "master";

type SnakeStore = {
  // Game state
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
  hasWon: boolean;
  setHasWon: (value: boolean) => void;

  // Bet and winnings
  betAmount: number;
  setBetAmount: (value: number) => void;
  currentMultiplier: number;
  setCurrentMultiplier: (value: number) => void;
  winnings: number;
  setWinnings: (value: number) => void;

  // Dice state
  diceValues: [number, number];
  setDiceValues: (value: [number, number]) => void;
  isRolling: boolean;
  setIsRolling: (value: boolean) => void;

  // Position tracking
  currentPathIndex: number; // Index in the path array (0 = start)
  setCurrentPathIndex: (value: number) => void;
  pathHistory: number[]; // Array of visited path indices
  setPathHistory: (value: number[]) => void;
  addToPathHistory: (value: number) => void;

  // Difficulty
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;

  // Animation state
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;

  // Reset game
  resetGame: () => void;
};

export const useSnakeStore = create<SnakeStore>()((set) => ({
  // Game state
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  gameOver: false,
  setGameOver: (value) => set({ gameOver: value }),
  hasWon: false,
  setHasWon: (value) => set({ hasWon: value }),

  // Bet and winnings
  betAmount: 0,
  setBetAmount: (value) => set({ betAmount: value }),
  currentMultiplier: 1,
  setCurrentMultiplier: (value) => set({ currentMultiplier: value }),
  winnings: 0,
  setWinnings: (value) => set({ winnings: value }),

  // Dice state
  diceValues: [1, 1],
  setDiceValues: (value) => set({ diceValues: value }),
  isRolling: false,
  setIsRolling: (value) => set({ isRolling: value }),

  // Position tracking
  currentPathIndex: 0,
  setCurrentPathIndex: (value) => set({ currentPathIndex: value }),
  pathHistory: [0],
  setPathHistory: (value) => set({ pathHistory: value }),
  addToPathHistory: (value) =>
    set((state) => ({ pathHistory: [...state.pathHistory, value] })),

  // Difficulty
  difficulty: "medium",
  setDifficulty: (value) => set({ difficulty: value }),

  // Animation state
  isAnimating: false,
  setIsAnimating: (value) => set({ isAnimating: value }),

  // Reset game
  resetGame: () =>
    set({
      isPlaying: false,
      gameOver: false,
      hasWon: false,
      currentMultiplier: 1,
      winnings: 0,
      diceValues: [1, 1],
      isRolling: false,
      currentPathIndex: 0,
      pathHistory: [0],
      isAnimating: false,
    }),
}));

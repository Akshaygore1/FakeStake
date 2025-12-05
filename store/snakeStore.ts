import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard" | "expert" | "master";

type SnakeStore = {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  score: number;
  setScore: (value: number) => void;
  betAmount: number;
  setBetAmount: (value: number) => void;
  gameOver: boolean;
  setGameOver: (value: boolean) => void;
  highScore: number;
  setHighScore: (value: number) => void;
};

export const useSnakeStore = create<SnakeStore>()((set) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  difficulty: "medium",
  setDifficulty: (value) => set({ difficulty: value }),
  score: 0,
  setScore: (value) => set({ score: value }),
  betAmount: 0,
  setBetAmount: (value) => set({ betAmount: value }),
  gameOver: false,
  setGameOver: (value) => set({ gameOver: value }),
  highScore: 0,
  setHighScore: (value) => set({ highScore: value }),
}));

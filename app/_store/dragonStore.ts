import { create } from "zustand";
import { useCommonStore } from "./commonStore";

type Difficulty = "easy" | "medium" | "hard";

type DragonState = {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
};

export const useDragonStore = create<DragonState>((set, get) => ({
  betAmount: 10,
  setBetAmount: (amount) => set({ betAmount: amount }),
  difficulty: "easy",
  setDifficulty: (difficulty) => set({ difficulty }),
}));

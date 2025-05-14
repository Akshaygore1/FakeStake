import { create } from "zustand";

type LimboStore = {
  isRolling: boolean;
  setIsRolling: (value: boolean) => void;
  displayMultiplier: number;
  setDisplayMultiplier: (value: number) => void;
  multiplier: number;
  setMultiplier: (value: number) => void;
  recentWins: { isWin: boolean; randomNumber: number }[];
  setRecentWins: (value: { isWin: boolean; randomNumber: number }[]) => void;
  betAmount: number;
  setBetAmount: (value: number) => void;
};

export const useLimboStore = create<LimboStore>()((set) => ({
  isRolling: false,
  setIsRolling: (value) => set({ isRolling: value }),
  displayMultiplier: 1,
  setDisplayMultiplier: (value) => set({ displayMultiplier: value }),
  multiplier: 2,
  setMultiplier: (value) => set({ multiplier: value }),
  recentWins: [],
  setRecentWins: (value) => set({ recentWins: value }),
  betAmount: 0,
  setBetAmount: (value) => set({ betAmount: value }),
}));

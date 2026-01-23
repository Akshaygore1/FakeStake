import { create } from "zustand";
import { ReactNode } from "react";

export interface GameResult {
  gameName: string | ReactNode;
  result: string;
  amount: number;
  finalBalance: number | ReactNode;
}

type HistoryStore = {
  gameHistory: GameResult[];
  addGameResult: (
    gameName: ReactNode | string,
    result: string,
    amount: number,
    finalBalance: ReactNode | number
  ) => void;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
  gameHistory: [],
  addGameResult: (gameName, result, amount, finalBalance) => {
    if (typeof amount !== "number" || isNaN(amount)) {
      throw new Error("Amount isn't a valid number");
    }

    const newResult: GameResult = {
      gameName,
      result,
      amount: Number(amount.toFixed(2)),
      finalBalance,
    };

    set((state) => ({
      gameHistory: [...state.gameHistory.slice(-4), newResult],
    }));
  },
  clearHistory: () => set({ gameHistory: [] }),
}));

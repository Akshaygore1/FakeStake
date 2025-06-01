import { create } from "zustand";
import { RiskLevel, RowCount } from "../_components/plinko/utils";

export interface PlinkoState {
  betAmount: number;
  rowCount: RowCount;
  riskLevel: RiskLevel;
  balance: number;
  multiplier: number;
  gameHistory: {
    betAmount: number;
    multiplier: number;
    profit: number;
    timestamp: number;
  }[];
  setBetAmount: (amount: number) => void;
  setRowCount: (count: RowCount) => void;
  setRiskLevel: (level: RiskLevel) => void;
  setMultiplier: (multiplier: number) => void;
  addGameResult: (betAmount: number, multiplier: number) => void;
  updateBalance: (amount: number) => void;
}

export const usePlinkoStore = create<PlinkoState>((set) => ({
  betAmount: 0,
  rowCount: 8,
  riskLevel: RiskLevel.MEDIUM,
  balance: 1000, // Starting balance
  multiplier: 1,
  gameHistory: [],
  setBetAmount: (amount) => set({ betAmount: amount }),
  setRowCount: (count) => set({ rowCount: count }),
  setRiskLevel: (level) => set({ riskLevel: level }),
  setMultiplier: (multiplier) => set({ multiplier }),
  addGameResult: (betAmount, multiplier) => {
    const profit = betAmount * multiplier - betAmount;
    set((state) => ({
      gameHistory: [
        ...state.gameHistory,
        {
          betAmount,
          multiplier,
          profit,
          timestamp: Date.now(),
        },
      ],
      balance: state.balance + profit,
    }));
  },
  updateBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),
}));

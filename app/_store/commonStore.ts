import { create } from "zustand";
import { persist } from "zustand/middleware";

type CommonStore = {
  profitAmount: number;
  setProfitAmount: (profitAmount: number) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
  clearCommonState: () => void;
};

export const useCommonStore = create<CommonStore>()(
  persist(
    (set, get) => ({
      profitAmount: 0,
      multiplier: 0,
      balance: 1000,
      setProfitAmount: (profitAmount) => set({ profitAmount }),
      setMultiplier: (multiplier) => set({ multiplier }),
      setBalance: (balance) => set({ balance: balance < 0 ? 0 : balance }),
      clearCommonState: () => {
        const currentBalance = get().balance;
        set({
          profitAmount: 0,
          multiplier: 0,
          balance: currentBalance < 100 ? 1000 : currentBalance,
        });
      },
    }),
    { name: "config-storage" }
  )
);

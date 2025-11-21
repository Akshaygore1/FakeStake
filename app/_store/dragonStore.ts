import { create } from "zustand";
import { useCommonStore } from "./commonStore";

type DragonState = {
  betAmount: number;
  setBetAmount: (amount: number) => void;

};

export const useDragonStore = create<DragonState>((set, get) => ({
  betAmount: 10,
  setBetAmount: (amount) => set({ betAmount: amount }),
}));

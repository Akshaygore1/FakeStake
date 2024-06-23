import { create } from "zustand";

type ConfigStore = {
  betAmount: number | null;
  isGameSetup: boolean;
  setIsGameSetup: (isGameSetup: boolean) => void;
  setBetAmount: (betAmount: number | null) => void;
  handleSetupGame: () => void;
  resetGame: () => void;
  gameStarted: boolean;
  setGameStarted: (gameStarted: boolean) => void;
  clearConfigStore: () => void;
};

export const useRockerConfig = create<ConfigStore>((set) => ({
  betAmount: null,
  isGameSetup: false,
  gameStarted: false,
  setIsGameSetup: (isGameSetup) => set({ isGameSetup }),
  setBetAmount: (betAmount) => set({ betAmount }),
  handleSetupGame: () => set({ isGameSetup: true }),
  resetGame: () =>
    set({
      isGameSetup: false,
      betAmount: null,
      gameStarted: false,
    }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
  clearConfigStore: () => set({ isGameSetup: false, betAmount: null }),
}));

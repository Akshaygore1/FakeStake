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
export const useRockerConfig = create<ConfigStore>()((set, get) => ({
  numberOfMines: 1,
  gameStarted: false,
  betAmount: null,
  isGameSetup: false,
  setGameStarted: (gameStarted) => set({ gameStarted }),
  setIsGameSetup: (isGameSetup) => set({ isGameSetup }),
  setBetAmount: (betAmount) => set({ betAmount }),
  handleSetupGame: () => {
    set({ isGameSetup: true });
  },
  resetGame: () =>
    set({
      isGameSetup: false,
      betAmount: null,
      gameStarted: false,
    }),
  clearConfigStore: () => set({ isGameSetup: false, betAmount: null }),
}));

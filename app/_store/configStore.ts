import { create } from "zustand";
import { persist } from "zustand/middleware";

// const [gameStarted, setGameStarted] = useState(false);

type ConfigStore = {
  numberOfMines: number;
  betAmount: number | null;
  isGameSetup: boolean;
  setIsGameSetup: (isGameSetup: boolean) => void;
  setNumberOfMines: (numberOfMines: number) => void;
  setBetAmount: (betAmount: number | null) => void;
  handleSetupGame: () => void;
  resetGame: () => void;
  gameStarted: boolean;
  setGameStarted: (gameStarted: boolean) => void;
  clearConfigStore: () => void;
};

export const useConfigStore = create<ConfigStore>()(
  // persist(
  (set, get) => ({
    numberOfMines: 1,
    gameStarted: false,
    betAmount: 0,
    isGameSetup: false,
    setGameStarted: (gameStarted) => set({ gameStarted }),
    setIsGameSetup: (isGameSetup) => set({ isGameSetup }),
    setNumberOfMines: (numberOfMines) => set({ numberOfMines }),
    setBetAmount: (betAmount) => set({ betAmount }),
    handleSetupGame: () => {
      const { numberOfMines, betAmount } = get();
      set({ isGameSetup: true });
    },
    resetGame: () =>
      set({
        isGameSetup: false,
        numberOfMines: 1,
        gameStarted: false,
      }),
    clearConfigStore: () => set({ isGameSetup: false }),
  })
  // { name: 'config-storage' }
  // )
);

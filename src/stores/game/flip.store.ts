import { create } from "zustand";
import { useCommonStore } from "../common.store";

type FlipState = {
  selectedSide: "heads" | "tails";
  result: "heads" | "tails" | "";
  outcome: "win" | "lose" | "";
  betAmount: number;
  isFlipping: boolean;
  setSelectedSide: (side: "heads" | "tails") => void;
  setBetAmount: (amount: number) => void;
  flipCoin: () => void;
  resetGame: () => void;
};

export const useFlipStore = create<FlipState>((set, get) => ({
  selectedSide: "heads",
  result: "",
  outcome: "",
  betAmount: 10,
  isFlipping: false,

  setSelectedSide: (side) => set({ selectedSide: side }),
  setBetAmount: (amount) => set({ betAmount: amount }),

  flipCoin: () => {
    const { selectedSide, betAmount } = get();
    const { balance } = useCommonStore.getState();

    if (betAmount > balance || betAmount <= 0) return;

    // Deduct bet amount
    useCommonStore.setState({ balance: balance - betAmount });

    // Generate result
    const flipResult: "heads" | "tails" =
      Math.random() < 0.5 ? "heads" : "tails";
    const win = flipResult === selectedSide;

    set({
      isFlipping: true,
      result: flipResult,
      outcome: "",
    });

    // After animation completes (2 seconds)
    setTimeout(() => {
      const { balance: currentBalance } = useCommonStore.getState();
      const newBalance = win ? currentBalance + betAmount * 2 : currentBalance;

      set({
        isFlipping: false,
        outcome: win ? "win" : "lose",
      });

      useCommonStore.setState({ balance: newBalance });
    }, 2000);
  },

  resetGame: () => {
    set({
      result: "",
      outcome: "",
      isFlipping: false,
    });
  },
}));

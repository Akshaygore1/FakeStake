import { create } from "zustand";

export interface BetType {
  type: string;
  value: number | string;
  amount: number;
  payout: number;
}

export interface GameResult {
  winningNumber: number;
  bets: BetType[];
  totalBet: number;
  totalWin: number;
  profit: number;
  timestamp: number;
}

interface RouletteStore {
  // Game state
  isSpinning: boolean;
  setIsSpinning: (value: boolean) => void;

  // Current bets
  currentBets: BetType[];
  setCurrentBets: (bets: BetType[]) => void;
  addBet: (bet: BetType) => void;
  removeBet: (betIndex: number) => void;
  clearBets: () => void;

  // Game results
  lastWinningNumber: number | null;
  setLastWinningNumber: (number: number) => void;

  // Game history
  gameHistory: GameResult[];
  addGameResult: (result: GameResult) => void;

  // Bet amount for quick betting
  betAmount: number;
  setBetAmount: (amount: number) => void;
}

// Roulette payout calculations
export const getPayoutMultiplier = (
  betType: string,
  betValue: string | number
): number => {
  switch (betType) {
    case "number": // Straight up bet
      return 35;
    case "range":
      if (betValue === "1-12" || betValue === "13-24" || betValue === "25-36")
        return 2; // Dozens
      if (betValue === "1-18" || betValue === "19-36") return 1; // High/Low
      return 1;
    case "type": // Even/Odd
      return 1;
    case "color": // Red/Black
      return 1;
    case "column": // 2:1 columns
      return 2;
    default:
      return 0;
  }
};

export const useRouletteStore = create<RouletteStore>()((set, get) => ({
  // Game state
  isSpinning: false,
  setIsSpinning: (value) => set({ isSpinning: value }),

  // Current bets
  currentBets: [],
  setCurrentBets: (bets) => set({ currentBets: bets }),
  addBet: (bet) => {
    const currentBets = get().currentBets;
    // Check if bet already exists, if so, add to the amount
    const existingBetIndex = currentBets.findIndex(
      (b) => b.type === bet.type && b.value === bet.value
    );

    if (existingBetIndex >= 0) {
      const updatedBets = [...currentBets];
      updatedBets[existingBetIndex].amount += bet.amount;
      set({ currentBets: updatedBets });
    } else {
      set({ currentBets: [...currentBets, bet] });
    }
  },
  removeBet: (betIndex) => {
    const currentBets = get().currentBets;
    set({ currentBets: currentBets.filter((_, index) => index !== betIndex) });
  },
  clearBets: () => set({ currentBets: [] }),

  // Game results
  lastWinningNumber: null,
  setLastWinningNumber: (number) => set({ lastWinningNumber: number }),

  // Game history
  gameHistory: [],
  addGameResult: (result) => {
    set((state) => ({
      gameHistory: [result, ...state.gameHistory].slice(0, 50), // Keep last 50 games
    }));
  },

  // Bet amount
  betAmount: 10,
  setBetAmount: (amount) => set({ betAmount: amount }),
}));

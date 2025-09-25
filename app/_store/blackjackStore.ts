import { create } from "zustand";

export type Card = {
  value: number;
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  display: string;
};

export type GameStatus =
  | "betting"
  | "player-turn"
  | "dealer-turn"
  | "game-over";

type BlackjackStore = {
  playerHand: Card[];
  dealerHand: Card[];
  gameStatus: GameStatus;
  playerScore: number;
  dealerScore: number;
  betAmount: number;
  message: string;
  deck: Card[];

  // Actions
  initializeDeck: () => void;
  shuffleDeck: () => void;
  drawCard: () => Card | null;
  calculateScore: (hand: Card[]) => number;
  dealInitialCards: () => void;
  playerHit: () => void;
  playerStand: () => void;
  dealerPlay: () => void;
  placeBet: (amount: number) => void;
  newGame: () => void;
  setMessage: (message: string) => void;
  setGameStatus: (status: GameStatus) => void;
};

const createDeck = (): Card[] => {
  const suits: Card["suit"][] = ["hearts", "diamonds", "clubs", "spades"];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (let i = 1; i <= 13; i++) {
      let value = i;
      let display = i.toString();

      if (i === 1) {
        value = 11; // Ace initially worth 11
        display = "A";
      } else if (i === 11) {
        value = 10;
        display = "J";
      } else if (i === 12) {
        value = 10;
        display = "Q";
      } else if (i === 13) {
        value = 10;
        display = "K";
      }

      deck.push({ value, suit, display });
    }
  }

  return deck;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useBlackjackStore = create<BlackjackStore>()((set, get) => ({
  playerHand: [],
  dealerHand: [],
  gameStatus: "betting",
  playerScore: 0,
  dealerScore: 0,
  betAmount: 0,
  message: "Place your bet to start the game",
  deck: [],

  initializeDeck: () => {
    const newDeck = createDeck();
    set({ deck: shuffleArray(newDeck) });
  },

  shuffleDeck: () => {
    const { deck } = get();
    set({ deck: shuffleArray(deck) });
  },

  drawCard: () => {
    const { deck } = get();
    if (deck.length === 0) {
      get().initializeDeck();
      return get().drawCard();
    }

    const card = deck[0];
    const remainingDeck = deck.slice(1);
    set({ deck: remainingDeck });
    return card;
  },

  calculateScore: (hand: Card[]) => {
    let score = 0;
    let aces = 0;

    for (const card of hand) {
      if (card.display === "A") {
        aces++;
        score += 11;
      } else {
        score += card.value;
      }
    }

    // Convert Aces from 11 to 1 if score is over 21
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  },

  dealInitialCards: () => {
    const playerCard1 = get().drawCard();
    const dealerCard1 = get().drawCard();
    const playerCard2 = get().drawCard();
    const dealerCard2 = get().drawCard();

    if (!playerCard1 || !dealerCard1 || !playerCard2 || !dealerCard2) return;

    const playerHand = [playerCard1, playerCard2];
    const dealerHand = [dealerCard1, dealerCard2];

    const playerScore = get().calculateScore(playerHand);
    const dealerScore = get().calculateScore([dealerCard1]); // Only show first card

    set({
      playerHand,
      dealerHand,
      playerScore,
      dealerScore,
      gameStatus: "player-turn",
      message: "Your turn - Hit or Stand?",
    });

    // Check for blackjack
    if (playerScore === 21) {
      get().playerStand();
    }
  },

  playerHit: () => {
    const { gameStatus, playerHand } = get();
    if (gameStatus !== "player-turn") return;

    const newCard = get().drawCard();
    if (!newCard) return;

    const newPlayerHand = [...playerHand, newCard];
    const newPlayerScore = get().calculateScore(newPlayerHand);

    set({
      playerHand: newPlayerHand,
      playerScore: newPlayerScore,
    });

    if (newPlayerScore > 21) {
      set({
        gameStatus: "game-over",
        message: "You busted! Dealer wins.",
      });
    }
  },

  playerStand: () => {
    const { gameStatus, dealerHand } = get();
    if (gameStatus !== "player-turn") return;

    const fullDealerScore = get().calculateScore(dealerHand);
    set({
      dealerScore: fullDealerScore,
      gameStatus: "dealer-turn",
      message: "Dealer's turn...",
    });

    // Dealer plays automatically
    setTimeout(() => {
      get().dealerPlay();
    }, 1000);
  },

  dealerPlay: () => {
    let { dealerHand, playerScore } = get();
    let dealerScore = get().calculateScore(dealerHand);

    // Dealer draws until 17 or higher
    while (dealerScore < 17) {
      const newCard = get().drawCard();
      if (!newCard) break;

      dealerHand = [...dealerHand, newCard];
      dealerScore = get().calculateScore(dealerHand);
    }

    // Determine winner and message
    let message = "";
    if (dealerScore > 21) {
      message = "Dealer busted! You win!";
    } else if (playerScore > dealerScore) {
      message = "You win!";
    } else if (playerScore < dealerScore) {
      message = "Dealer wins!";
    } else {
      message = "Push! It's a tie.";
    }

    set({
      dealerHand,
      dealerScore,
      gameStatus: "game-over",
      message,
    });
  },

  placeBet: (amount: number) => {
    set({
      betAmount: amount,
      gameStatus: "player-turn",
    });
    get().dealInitialCards();
  },

  newGame: () => {
    set({
      playerHand: [],
      dealerHand: [],
      gameStatus: "betting",
      playerScore: 0,
      dealerScore: 0,
      betAmount: 0,
      message: "Place your bet to start the game",
    });
  },

  setMessage: (message: string) => {
    set({ message });
  },

  setGameStatus: (status: GameStatus) => {
    set({ gameStatus: status });
  },
}));

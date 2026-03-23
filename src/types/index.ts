/**
 * Centralized type definitions for FakeStake
 * Add shared types, interfaces, and type utilities here
 */

// Game-related types
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export type BetAmount = number;

export interface GameResult {
  won: boolean;
  multiplier: number;
  payout: number;
}

// Common store types
export interface BalanceState {
  balance: number;
  profitAmount: number;
  multiplier: number;
}

// Grid/Mines game types
export interface GridSelection {
  [key: number]: boolean;
}

// Re-export specific game types as needed

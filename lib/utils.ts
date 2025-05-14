import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWeightedRandom() {
  const randomCheck = Math.random();

  if (randomCheck <= 0.95) {
    // Generate random number between 1 and 2 (inclusive)
    return Math.random() + 1;
  } else {
    // Generate random number between 2 and 99 (inclusive)
    return Math.floor(Math.random() * 98) + 2;
  }
}

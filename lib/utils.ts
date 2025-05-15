import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWeightedRandom() {
  const randomCheck = Math.random();

  if (randomCheck <= 0.95) {
    // Generate random number between 1 and 3 (inclusive)
    // Math.random() gives a number between 0 (inclusive) and 1 (exclusive)
    // Math.random() * 2 gives a number between 0 (inclusive) and 2 (exclusive)
    // Adding 1 shifts the range to be between 1 (inclusive) and 3 (exclusive)
    // We use Math.random() * 2 + 1 to cover the range from 1 up to, but not including, 3.
    // If you strictly need 3 to be included, we need to be a little more careful
    // about the upper bound of Math.random(). However, for a continuous range
    // like 1-3, this is typically sufficient.
    return Math.random() * 2 + 1;
  } else {
    // You didn't specify what should happen in the other 5% of cases.
    // I'll keep your original logic for this part for now, which is
    // to generate a random number between 2 and 99 (inclusive).
    return Math.floor(Math.random() * 98) + 2;
  }
}

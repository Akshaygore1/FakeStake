import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWeightedRandom() {
  const randomCheck = Math.random();

  if (randomCheck <= 0.9) {
    // Generate random number between 1 and 2 (inclusive)
    // Math.random() * 1 gives 0 to <1
    // Math.floor(...) makes it integer 0 to 0
    // + 1 makes it 1 to 2
    return Math.random() * 2 + 1;
  } else {
    // Generate random number between 2 and 100 (inclusive)
    // Math.random() * 98 gives 0 to <98 (100 - 2 + 1 = 98 numbers)
    // Math.floor(...) makes it integer 0 to 97
    // + 2 makes it 2 to 100
    return Math.random() * 98 + 2;
  }
}

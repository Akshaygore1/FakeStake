import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWeightedRandom(probabilityLowerRange = 0.9) {
  const randomCheck = Math.random();

  if (randomCheck <= probabilityLowerRange) {
    // Generate random number between 1 and 10 (inclusive)
    // Math.random() * 10 gives 0 to <10
    // Math.floor(...) makes it integer 0 to 9
    // + 1 makes it 1 to 10
    return Math.random() * 10 + 1;
  } else {
    // Generate random number between 11 and 100 (inclusive)
    // Math.random() * 90 gives 0 to <90 (100 - 11 + 1 = 90 numbers)
    // Math.floor(...) makes it integer 0 to 89
    // + 11 makes it 11 to 100
    return Math.random() * 90 + 11;
  }
}

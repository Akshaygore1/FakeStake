/**
 * Roulette game constants - shared across components
 */

// Red numbers in European roulette
export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

// European roulette wheel order - matches the actual wheel image layout
export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
] as const;

// Wheel numbers for animation calculations
export const WHEEL_NUMBERS_AC = [
  0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23,
  8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
] as const;

/**
 * Check if a number is red
 */
export function isRedNumber(num: number): boolean {
  return RED_NUMBERS.has(num);
}

/**
 * Get the color of a roulette number
 */
export function getNumberColor(num: number): "red" | "black" | "green" {
  if (num === 0) return "green";
  return RED_NUMBERS.has(num) ? "red" : "black";
}

/**
 * Get the CSS class for a number's color
 */
export function getNumberColorClass(num: number): string {
  if (num === 0) return "text-green-400";
  return RED_NUMBERS.has(num) ? "text-red-400" : "text-white";
}

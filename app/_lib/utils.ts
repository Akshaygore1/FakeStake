export function calculateWinningAmount(
	betAmount: number,
	numberOfMines: number
): number {
	const totalTiles = 25;
	const k = 1.5; // Scaling factor, adjust based on game balance
	const multiplier = Math.pow(totalTiles / (totalTiles - numberOfMines), k);
	const winningAmount = betAmount * multiplier;
	return winningAmount;
}

export function calculatePerMineMultiplier(numberOfMines: number): number {
	const totalTiles = 25;
	if (numberOfMines === 0) {
		return 1;
	}
	const k = 1.5; // Scaling factor
	const totalMultiplier = Math.pow(
		totalTiles / (totalTiles - numberOfMines),
		k
	);
	const perMineMultiplier = totalMultiplier / numberOfMines;
	return perMineMultiplier;
}

export function calculateBaseMultiplier(numberOfMines: number): number {
	const baseMultiplier = 1 + numberOfMines * 0.1;
	return baseMultiplier;
}

export function calculateCurrentProfit(
	betAmount: number,
	numberOfMines: number,
	numberOfSuccessfulClicks: number
): number {
	const baseMultiplier = calculateBaseMultiplier(numberOfMines);
	const multiplier = Math.pow(baseMultiplier, numberOfSuccessfulClicks);
	const profit = betAmount * multiplier;
	return profit;
}

// Multiplier data directly from the provided table
const multiplierTable: { [key: number]: number[] } = {
	1: [
		1.03, 1.08, 1.12, 1.189, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.9, 2.06,
		2.25, 2.47, 2.75, 3.09, 3.54, 4.12, 4.95, 6.19, 8.25, 12.37, 24.75,
	],
	2: [
		1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81, 4.5,
		5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297,
	],
	3: [
		1.12, 1.29, 1.48, 1.71, 2.0, 2.35, 2.79, 3.35, 4.07, 5.0, 6.26, 7.96, 10.35,
		13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.25, 2277,
	],
	4: [
		1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52,
		25.3, 37.95, 59.64, 99.39, 178.91, 357.81, 834.9, 2504.7, 12523.5,
	],
	5: [
		1.24, 1.56, 2.0, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.27, 40.87,
		66.41, 113.85, 208.72, 417.45, 939.26, 2504.7, 8766.45, 52598.7,
	],
	6: [
		1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38, 102.17,
		189.75, 379.5, 834.9, 2087.25, 6261.75, 25047, 175329,
	],
	7: [
		1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66,
		277.33, 600.87, 1442.1, 3965.77, 13219.25, 59486.62, 475893,
	],
	8: [
		1.46, 2.18, 3.35, 5.26, 8.5, 14.17, 24.47, 44.05, 83.2, 166.4, 356.56,
		831.98, 2163.15, 6489.45, 23794.65, 118973.25, 1070759.25,
	],
	9: [
		1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 41.6, 83.2, 176.8, 404.1, 1010.26,
		2828.73, 9193.39, 36773.55, 202254.52, 2022545.25,
	],
	10: [
		1.65, 2.83, 5.0, 9.17, 17.52, 35.03, 73.95, 166.4, 404.1, 1077.61, 3232.84,
		11314.94, 49031.4, 294188.4, 3236072.4,
	],
	11: [
		1.77, 3.26, 6.26, 12.51, 26.27, 58.38, 138.66, 356.56, 1010.26, 3232.84,
		12123.15, 56574.69, 367735.5, 4412826,
	],
	12: [
		1.9, 3.81, 7.96, 17.52, 40.87, 102.17, 277.33, 831.98, 2828.73, 11314.94,
		56574.69, 396022.85, 5148297,
	],
	13: [
		2.06, 4.5, 10.35, 25.3, 66.41, 189.75, 600.87, 2163.15, 9193.39, 49031.4,
		367735.5, 5148297,
	],
	14: [
		2.25, 5.4, 13.8, 37.95, 113.85, 379.5, 1442.1, 6489.45, 36773.55, 294188.4,
		4412826,
	],
	15: [
		2.47, 6.6, 18.97, 59.64, 208.72, 834.9, 3965.77, 23794.65, 202254.52,
		3236072.4,
	],
	16: [
		2.75, 8.25, 27.11, 99.39, 417.45, 2087.25, 13219.25, 118973.25, 2022545.25,
	],
	17: [3.09, 10.61, 40.66, 178.91, 939.26, 6261.75, 59486.62, 1070759.25],
	18: [3.54, 14.14, 65.06, 357.81, 2504.7, 25047, 475893],
	19: [4.12, 19.8, 113.85, 834.9, 8766.45, 175329],
	20: [4.95, 29.7, 227.7, 2504.7, 52598.7],
	21: [6.19, 49.5, 569.25, 12523.5],
	22: [8.25, 99, 2277],
	23: [12.37, 297],
	24: [24.75],
};

export function getMultiplier(selectedTiles: number, mines: number) {
	if (
		multiplierTable[selectedTiles] &&
		mines > 0 &&
		mines <= multiplierTable[selectedTiles].length
	) {
		return multiplierTable[selectedTiles][mines - 1];
	} else {
		throw new Error('Invalid number of selected tiles or mines');
	}
}

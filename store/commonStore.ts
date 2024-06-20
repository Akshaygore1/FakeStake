import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CommonStore = {
	profitAmount: number;
	setProfitAmount: (profitAmount: number) => void;
	multiplier: number;
	setMultiplier: (multiplier: number) => void;
	balance: number;
	setBalance: (balance: number) => void;
	clearCommonState: () => void;
};

export const useCommonStore = create<CommonStore>()(
	persist(
		(set, get) => ({
			profitAmount: 0,
			multiplier: 0,
			balance: 1000,
			setProfitAmount: (profitAmount) => set({ profitAmount }),
			setMultiplier: (multiplier) => set({ multiplier }),
			setBalance: (balance) => set({ balance }),
			clearCommonState: () => set({ profitAmount: 0, multiplier: 0 }),
		}),
		{ name: 'config-storage' }
	)
);

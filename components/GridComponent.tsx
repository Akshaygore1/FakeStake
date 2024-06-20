'use client';

import { useConfigStore } from '@/store/configStore';
import { useGridStore } from '@/store/gridStore';
import { useEffect, useState } from 'react';
import Modal from './ui/Modal';
import { Bomb, Gem } from 'lucide-react';
import { useCommonStore } from '@/store/commonStore';

export default function GridComponent() {
	const {
		selectedGrid,
		handleSelectGrid,
		setSelectedGrid,
		numberOfSuccessfulClicks,
		setNumberOfSuccessfulClicks,
		resetGrid,
	} = useGridStore();
	const {
		numberOfMines,
		isGameSetup,
		setIsGameSetup,
		setNumberOfMines,
		setBetAmount,
		resetGame,
		clearConfigStore,
	} = useConfigStore();
	const { multiplier, setMultiplier, clearCommonState } = useCommonStore();

	const [mines, setMines] = useState<number[]>([]);
	const [showModal, setShowModal] = useState(false);

	console.log('MINES: ', mines);

	useEffect(() => {
		if (isGameSetup) {
			setSelectedGrid({});
			const generateUniqueMines = () => {
				const minePositions = new Set<number>();
				while (minePositions.size < numberOfMines) {
					minePositions.add(Math.floor(Math.random() * 25));
				}
				return Array.from(minePositions);
			};
			setMines(generateUniqueMines());
		}
	}, [numberOfMines, isGameSetup, setSelectedGrid]);

	const handleGridClick = (index: number) => {
		if (isGameSetup) {
			if (mines.includes(index)) {
				handleSelectGrid(index);
				setShowModal(true);
				setNumberOfMines(1);
				setNumberOfSuccessfulClicks(0);
				clearCommonState();
				clearConfigStore();
				resetGame();
			} else {
				if (!selectedGrid[index]) {
					handleSelectGrid(index);
					setNumberOfSuccessfulClicks(numberOfSuccessfulClicks + 1);
				}
			}
		}
	};

	return (
		<div className='grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2'>
			{Array.from({ length: 25 }).map((_, index) => (
				<div
					key={index}
					className={`h-16 w-16 sm:h-16 sm:w-16 md:h-22 md:w-22 lg:h-28 lg:w-28 flex justify-center items-center border transition-transform duration-200 ${
						selectedGrid[index]
							? mines.includes(index)
								? 'border-red-500 text-white animate-shake'
								: 'border-green-500 text-white animate-pop'
							: 'border-gray-300 hover:scale-105'
					}`}
					onClick={() => handleGridClick(index)}
				>
					{/* Conditional rendering of icons */}
					{selectedGrid[index] && (
						<>
							{mines.includes(index) ? (
								<Bomb
									size={48}
									color='red'
									className='flex justify-center items-center'
								/>
							) : (
								multiplier > 0 && (
									<div className='relative flex items-center justify-center w-full h-full text-2xl text-white font-bold'>
										<div className='absolute inset-0 bg-green-500 opacity-75 blur-sm animate-pulse'></div>
										<div className='relative animate-glow'>{multiplier}</div>
									</div>
								)
							)}
						</>
					)}
				</div>
			))}
			<Modal
				isOpen={showModal}
				closeModal={() => setShowModal(false)}
				result='lose'
				amount={100}
			/>
		</div>
	);
}

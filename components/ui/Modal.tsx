import { Bomb, Gem } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;
	result: 'win' | 'lose' | null; // Indicates if the user won or lost
	amount?: number; // Amount of money won or lost (optional)
}

export default function Modal({
	isOpen,
	closeModal,
	result,
	amount,
}: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				closeModal();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, closeModal]);

	if (!isOpen) return null;

	let modalContent = null;

	// Determine modal content based on result
	switch (result) {
		case 'win':
			modalContent = (
				<div
					ref={modalRef}
					className='modal relative p-6 bg-white shadow-lg rounded-lg'
				>
					<div className='modal relative p-6 rounded-lg'>
						<Gem
							size={100}
							color='green'
							className='flex justify-center items-center'
						/>
						<div className='text-center text-black pt-6'>You Won {amount}</div>
					</div>
				</div>
			);
			break;
		case 'lose':
			modalContent = (
				<div
					ref={modalRef}
					className='modal relative p-6 bg-white shadow-lg rounded-lg'
				>
					<div className='modal relative p-6 rounded-lg'>
						<Bomb
							size={100}
							color='red'
							className='flex justify-center items-center'
						/>
						<div className='text-center text-black pt-6'>Oops</div>
					</div>
				</div>
			);
			break;
		default:
			modalContent = (
				<div
					ref={modalRef}
					className='modal relative p-6 bg-white shadow-lg rounded-lg'
				>
					This is Modal
				</div>
			);
			break;
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
			<div className='relative w-auto max-w-lg mx-auto my-6'>
				{modalContent}
			</div>
		</div>
	);
}

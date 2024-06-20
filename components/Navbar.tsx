'use client';
import { useCommonStore } from '@/store/commonStore';
import { Coins } from 'lucide-react';
import React from 'react';

export default function Navbar() {
	const { balance } = useCommonStore();
	return (
		<div className='w-full p-4 flex justify-between items-center bg-gray-800 text-white'>
			<h1 className='text-2xl font-bold'>Fake Stake</h1>
			<div className='flex items-center'>
				<Coins className='w-6 h-6 mr-2' />
				<span className='text-lg'>{balance.toFixed(2)}</span>
			</div>
		</div>
	);
}

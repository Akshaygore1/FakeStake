'use client';
import { motion } from 'framer-motion';
import { fadeIn } from 'framer-motion-variants';
import { useCommonStore } from '@/app/_store/commonStore';
import { Coins } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
	const { balance } = useCommonStore();
	return (
		<motion.div variants={fadeIn} initial="initial" animate="animate" className='w-full p-4 flex justify-between items-center bg-gray-800 text-white'>
			<Link href='/' className='text-2xl font-bold' > Fake Stake
			</Link>
			<div className='flex items-center'>
				<Coins className='w-6 h-6 mr-2' />
				<span className='text-lg'>{balance.toFixed(2)}</span>
			</div>
		</motion.div>
	);
}

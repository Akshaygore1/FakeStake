"use client"
import { motion } from 'framer-motion';
import {parentFadeIn, leftFadeIn, fadeIn } from 'framer-motion-variants';
import ConfigComponent from '@/app/_components/ConfigComponent';
import GridComponent from '@/app/_components/GridComponent';
import Navbar from '@/app/_components/Navbar';

export default function Mines() {
	return (
		<main className="flex flex-col h-full">
			{/* Rest of the components in a row with two columns */}
			<motion.div
				variants={parentFadeIn}
				initial="initial"
				animate="animate"
				className="flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1"
			>
				<motion.div variants={leftFadeIn} className="flex justify-center w-full lg:w-1/3 p-4">
					<ConfigComponent />
				</motion.div>

				<motion.div variants={leftFadeIn} className="flex justify-center items-center w-full lg:w-2/3 p-4">
					<GridComponent />
				</motion.div>
			</motion.div>
		</main>
	);
}

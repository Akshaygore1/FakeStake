import Link from "next/link";
import React, { ReactNode } from "react";

type GameCardProps = {
	link: string;
	logo: ReactNode;
	name: string;
};

export default function GameCard({ link, logo, name }: GameCardProps) {
	return (
		<div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 hover:scale-105 transition-transform duration-200">
			<Link href={link}>
				<div className="w-full flex justify-center items-center h-48 bg-gray-700">
					{logo}
				</div>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{name}</div>
					<p className=" text-gray-300">Click to play {name}</p>
				</div>
			</Link>
		</div>
	);
}

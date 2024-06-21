import { Gem, Rocket } from 'lucide-react';

const games = [
	{
		name: 'Mines',
		link: '/mines',
		logo: <Gem size={48} color='#00ff62' />,
	},
	{
		name: "Rocket",
		link: '/rocket',
		logo: <Rocket size={48} color='#00ff62' />,
	}
];

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center p-24 justify-center'>
			{/* Hero Section */}
			<section className='w-full flex flex-col items-center text-center mb-12'>
				<h1 className='text-5xl font-bold mb-4'>Welcome to Fake Stake</h1>
				<p className='text-xl text-gray-500'>
					Your ultimate destination for playing games
				</p>
			</section>

			{/* Decorative Gradient Div */}
			<div className='relative flex place-items-center mb-12'>
				<div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-radial from-white to-transparent blur-2xl content-[''] dark:bg-gradient-to-br dark:from-transparent dark:to-blue-700 dark:opacity-10 lg:h-[360px]"></div>
				<div className="absolute -z-20 h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic from-sky-200 via-blue-200 blur-2xl content-[''] dark:from-sky-900 dark:via-[#11ff29] dark:opacity-40"></div>
			</div>

			{/* Game Cards Section */}
			<section className='w-full flex flex-wrap justify-center gap-8'>
				{games.map((game, index) => (
					<a
						href={game.link}
						key={index}
						className='max-w-xs rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-200'
					>
						<div className='w-full flex justify-center items-center h-48 bg-gray-200 dark:bg-gray-700'>
							{game.logo}
						</div>
						<div className='px-6 py-4'>
							<div className='font-bold text-xl mb-2'>{game.name}</div>
							<p className='text-gray-700 text-base dark:text-gray-300'>
								Click to play {game.name}
							</p>
						</div>
					</a>
				))}
			</section>
		</main>
	);
}

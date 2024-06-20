import ConfigComponent from '@/components/ConfigComponent';
import GridComponent from '@/components/GridComponent';
import Navbar from '@/components/Navbar';

export default function Home() {
	return (
		<main className='flex flex-col min-h-screen'>
			{/* Navbar at the top full width */}
			<div className='w-full'>
				<Navbar />
			</div>
			{/* Rest of the components in a row with two columns */}
			<div className='flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1'>
				<div className='flex justify-center w-full lg:w-1/3 p-4'>
					<ConfigComponent />
				</div>
				<div className='flex justify-center items-center w-full lg:w-2/3 p-4'>
					<GridComponent />
				</div>
			</div>
		</main>
	);
}

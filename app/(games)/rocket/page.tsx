import ConfigComponent from "@/app/_components/ConfigComponent";
import ConfigForRocket from "@/app/_components/ConfigForRocket";
import RocketComponent from "@/app/_components/RocketComponent";

export default function page() {
  return (
    <main className='flex flex-col h-full'>
    <div className='flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1'>
      <div className='flex justify-center w-full lg:w-1/3 p-4'>
        <ConfigForRocket />
      </div>
      <div className='flex justify-center items-center w-full lg:w-2/3 p-4'>
        <RocketComponent />
      </div>
    </div>
  </main>
  )
}

import MineContainer from "@/app/_components/mines/MineContainer";
import RouletteContainer from "@/app/_components/roulette/RouletteContainer";

export default function Mines() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row w-full flex-1">
        <div className="flex justify-center items-center w-full p-4">
          <RouletteContainer />
        </div>
      </div>
    </main>
  );
}

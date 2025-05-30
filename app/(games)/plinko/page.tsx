// import PlinkoGame from "@/app/_components/plinko/PlinkoGame";

import PlinkoConfig from "@/app/_components/plinko/PlinkoConfig";
import PlinkoGame from "@/app/_components/plinko/PlinkoGame";
import PlinkoGames from "@/app/_components/plinko/PlinkoGames";

export default function Dice() {
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1">
        <div className="flex justify-center items-center w-full p-4">
          {/* <PlinkoConfig />
          <PlinkoGames /> */}
          {/* <PlinkoGame /> */}
          <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
            <div className="w-full md:w-1/3 bg-primary">
              <PlinkoConfig />
            </div>
            <div className="w-full md:w-2/3">
              <PlinkoGames />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

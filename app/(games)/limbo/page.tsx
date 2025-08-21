import DiceGameContainer from "@/app/_components/Dice/DiceGameContainer";
import LimboContainer from "@/app/_components/limbo/LimboContainer";

export default function Limbo() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row w-full flex-1">
        <div className="flex justify-center items-center w-full p-4">
          <LimboContainer />
        </div>
      </div>
    </main>
  );
}

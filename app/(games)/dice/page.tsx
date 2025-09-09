import DiceGameContainer from "@/app/_components/Dice/DiceGameContainer";

export default function Dice() {
  return (
    <div className="flex-1 p-8">
      <div className="flex justify-center items-center w-full">
        <DiceGameContainer />
      </div>
    </div>
  );
}

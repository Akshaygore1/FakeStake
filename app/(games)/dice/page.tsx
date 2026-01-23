import DiceGameContainer from "./_components/DiceGameContainer";
import GamePage from "@/app/_components/GamePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dice Game Free - Play Online Casino Dice",
  description:
    "Play Dice game online for free! Roll the dice and win with virtual currency. Classic casino dice game with no real money required. 100% risk-free fun.",
  keywords: [
    "dice game",
    "free dice game",
    "online dice",
    "casino dice",
    "dice game free",
    "play dice online",
  ],
  openGraph: {
    title: "Play Dice Game Free Online | Fake Stake",
    description:
      "Roll the dice and test your luck with virtual currency. Free casino dice game!",
    url: "https://fakestake.fun/dice",
  },
};

export default function Dice() {
  return (
    <GamePage>
      <DiceGameContainer />
    </GamePage>
  );
}

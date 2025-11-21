import MineContainer from "@/app/_components/mines/MineContainer";
import GamePage from "@/app/_components/GamePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mines Game Free - Play Online Casino Mines",
  description:
    "Play Mines game online for free with virtual currency! Test your luck and strategy in this exciting casino game. No real money required - 100% risk-free entertainment.",
  keywords: [
    "mines game",
    "free mines game",
    "online mines",
    "casino mines",
    "mines game free",
    "play mines online",
  ],
  openGraph: {
    title: "Play Mines Game Free Online | Fake Stake",
    description:
      "Experience the thrill of Mines casino game with virtual currency. Free to play, no risk!",
    url: "https://fakestake.fun/mines",
  },
};

export default function Mines() {
  return (
    <GamePage>
      <MineContainer />
    </GamePage>
  );
}

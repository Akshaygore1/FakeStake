import RouletteContainer from "@/app/_components/roulette/RouletteContainer";
import GamePage from "@/app/_components/GamePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roulette Game Free - Play Online Casino Roulette",
  description:
    "Play Roulette online for free with virtual currency! Spin the wheel and place your bets in this classic casino game. No real money required - pure entertainment.",
  keywords: [
    "roulette game",
    "free roulette",
    "online roulette",
    "casino roulette",
    "roulette game free",
    "play roulette online",
  ],
  openGraph: {
    title: "Play Roulette Game Free Online | Fake Stake",
    description:
      "Spin the wheel and place your bets with virtual currency. Classic roulette action!",
    url: "https://fakestake.fun/roulette",
  },
};

export default function Roulette() {
  return (
    <GamePage>
      <RouletteContainer />
    </GamePage>
  );
}

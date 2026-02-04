import GamePage from "@/app/_components/GamePage";
import FlipGameContainer from "./_components/FlipContainer";
import type { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Flip Game Free - Play Online Casino Coin Flip",
  description:
    "Play Flip game online for free with virtual currency! Simple yet exciting coin flip casino game. No real money required - 100% risk-free entertainment.",
  keywords: [
    "flip game",
    "coin flip game",
    "free flip game",
    "online flip",
    "casino flip",
    "flip game free",
    "play flip online",
  ],
  openGraph: {
    title: "Play Flip Game Free Online | Fake Stake",
    description:
      "Flip the coin and test your luck with virtual currency. Simple, fun, free!",
    url: "https://fakestake.fun/flip",
  },
};

export default function Mines() {
  return (
    <GamePage>
      <FlipGameContainer />
    </GamePage>
  );
}

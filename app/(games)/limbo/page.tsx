import LimboContainer from "./_components/LimboContainer";
import GamePage from "@/app/_components/GamePage";
import type { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Limbo Game Free - Play Online Casino Limbo",
  description:
    "Play Limbo game online for free with virtual currency! Push your limits in this exciting casino game. No real money, pure entertainment and strategy.",
  keywords: [
    "limbo game",
    "free limbo game",
    "online limbo",
    "casino limbo",
    "limbo game free",
    "play limbo online",
  ],
  openGraph: {
    title: "Play Limbo Game Free Online | Fake Stake",
    description:
      "Experience the thrill of Limbo casino game with virtual currency. How high can you go?",
    url: "https://fakestake.fun/limbo",
  },
};

export default function Limbo() {
  return (
    <GamePage>
      <LimboContainer />
    </GamePage>
  );
}

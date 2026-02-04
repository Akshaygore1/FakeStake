import BlackjackContainer from "./_components/BlackjackContainer";
import GamePage from "@/app/_components/GamePage";
import type { Metadata } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Blackjack Game Free - Play Online Casino Blackjack",
  description:
    "Play Blackjack online for free with virtual currency! Beat the dealer in this classic card game. No real money required - practice your strategy risk-free.",
  keywords: [
    "blackjack game",
    "free blackjack",
    "online blackjack",
    "casino blackjack",
    "blackjack game free",
    "play blackjack online",
    "21 game",
  ],
  openGraph: {
    title: "Play Blackjack Free Online | Fake Stake",
    description:
      "Beat the dealer in classic Blackjack with virtual currency. Perfect your strategy!",
    url: "https://fakestake.fun/blackjack",
  },
};

export default function BlackjackPage() {
  return (
    <GamePage>
      <BlackjackContainer />
    </GamePage>
  );
}

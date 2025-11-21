/* eslint-disable @next/next/no-img-element */

import { Rocket } from "lucide-react";
import Link from "next/link";
import { url } from "@/app/_lib/assets";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Casino Games - Free Play | Mines, Plinko, Roulette, Dice & More",
  description:
    "Browse all free casino games on Fake Stake. Play Mines, Plinko, Dice, Limbo, Roulette, Blackjack, and Flip games online with virtual currency. No downloads, no real money required.",
  keywords: [
    "casino games",
    "free casino games",
    "online casino",
    "play casino free",
    "casino games list",
  ],
  openGraph: {
    title: "All Free Casino Games | Fake Stake",
    description:
      "Explore our collection of free casino games: Mines, Plinko, Roulette, Blackjack & more!",
    url: "https://fakestake.fun/games",
  },
};

const games = [
  {
    name: "MINES",
    link: "/mines",
    img: `${url}/mine.webp`,
    description: "Test your luck and strategy in the Mines game",
  },
  {
    name: "PLINKO",
    link: "/plinko",
    img: `${url}/plinko.webp`,
    description: "Watch the ball drop in this exciting Plinko game",
  },
  {
    name: "DICE",
    link: "/dice",
    img: `${url}/dice.webp`,
    description: "Roll the dice and win big in this classic game",
  },
  {
    name: "LIMBO",
    link: "/limbo",
    img: `${url}/limbo.webp`,
    description: "How high can you go in Limbo?",
  },
  {
    name: "ROULETTE",
    link: "/roulette",
    img: `${url}/roulette.webp`,
    description: "Spin the wheel and place your bets",
  },
  {
    name: "BLACKJACK",
    link: "/blackjack",
    img: `${url}/blackjack.webp`,
    description: "Beat the dealer in classic Blackjack",
  },
  {
    name: "FLIP",
    link: "/flip",
    img: `${url}/flip.jpg`,
    description: "Flip the coin and test your luck",
  },
];

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Casino Games",
    description: "Collection of free online casino games",
    itemListElement: games.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Game",
        name: game.name,
        description: game.description,
        url: `https://fakestake.fun${game.link}`,
        gamePlatform: "Web Browser",
        genre: "Casino Game",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen relative">
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
              <span className="text-success text-sm font-medium">
                New Games are coming soon
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              <span className="text-white font-medium text-transparent font-figtree">
                Casino
              </span>
              <span className="bg-gradient-to-r from-success to-green-400 bg-clip-text text-transparent ml-3 italic font-instrument-serif">
                Games
              </span>
            </h1>

            <p className="text-2xl text-gray-50 max-w-2xl mx-auto italic font-instrument-serif">
              Experience the thrill of casino gaming with our collection of
              popular games. All games are{" "}
              <span className="text-success font-semibold">
                100% free to play
              </span>{" "}
              with virtual currency.
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-4 max-w-6xl flex-wrap mx-auto">
            {games.map((game, index) => (
              <Link
                key={game.name}
                href={game.link}
                className="relative h-48 flex items-center justify-center bg-black/30"
              >
                <img
                  src={game.img}
                  alt={`${game.name} game preview`}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{ width: "auto", height: "100%" }}
                />
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-black border border-gray-600 font-instrument-serif">
              <Rocket className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-success font-medium">
                More games coming soon...
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */

import { Gem, Rocket, Star, Zap, Clock, Play } from "lucide-react";
import Link from "next/link";
import { url } from "@/app/_lib/assets";
import { MeshGradient } from "@paper-design/shaders-react";

const games = [
  {
    name: "MINES",
    link: "/mines",
    img: `${url}/mine.webp`,
  },
  {
    name: "PLINKO",
    link: "/plinko",
    img: `${url}/plinko.webp`,
  },
  {
    name: "DICE",
    link: "/dice",
    img: `${url}/dice.webp`,
  },
  {
    name: "LIMBO",
    link: "/limbo",
    img: `${url}/limbo.webp`,
  },
  {
    name: "ROULETTE",
    link: "/roulette",
    img: `${url}/roulette.webp`,
  },
  {
    name: "BLACKJACK",
    link: "/blackjack",
    img: `${url}/blackjack.webp`,
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="text-success text-sm font-medium">
              🎰 Roulette & Blackjack Beta is Live
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
  );
}

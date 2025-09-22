/* eslint-disable @next/next/no-img-element */

import { Gem, Rocket, Star, Zap, Clock, Play } from "lucide-react";
import Link from "next/link";
import { url } from "@/app/_lib/assets";

const games = [
  {
    name: "MINES",
    link: "/mines",
    img: `${url}/mines.png`,
  },
  {
    name: "PLINKO",
    link: "/plinko",
    img: `${url}/plinko.png`,
  },
  {
    name: "DICE",
    link: "/dice",
    img: `${url}/dice.png`,
  },
  {
    name: "LIMBO",
    link: "/limbo",
    img: `${url}/limbo.avif`,
  },
  {
    name: "ROULETTE",
    link: "/roulette",
    img: `${url}/roulette.webp`,
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26, 26, 26, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26, 26, 26, 0.8) 1px, transparent 1px),
            radial-gradient(circle 300px at 20% 80%, rgba(0, 255, 42, 0.261), transparent),
            radial-gradient(circle 300px at 80% 20%, rgba(0, 255, 42, 0.151), transparent)
          `,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="text-success text-sm font-medium">
              🎰 Roulette Beta is Live
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Casino
            </span>
            <span className="bg-gradient-to-r from-success to-green-400 bg-clip-text text-transparent ml-3">
              Games
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800/50 border border-gray-600 backdrop-blur-sm">
            <Rocket className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-400 font-medium">
              More games coming soon...
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

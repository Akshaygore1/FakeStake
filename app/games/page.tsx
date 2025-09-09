/* eslint-disable @next/next/no-img-element */

import { Star, Rocket } from "lucide-react";
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
];

export default function GamesPage() {
  return (
    <div className="flex-1 p-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-600/20 border border-green-600/30 mb-6">
            <Star className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 text-sm font-medium">
              🎮 Choose Your Game
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">
              Casino
            </span>
            <span className="text-green-400 ml-3">
              Games
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the thrill of casino gaming with our collection of
            popular games. All games are{" "}
            <span className="text-green-400 font-semibold">
              100% free to play
            </span>{" "}
            with virtual currency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <Link
              key={game.name}
              href={game.link}
              className="group relative h-64 flex items-center justify-center bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
            >
              <img
                src={game.img}
                alt={`${game.name} game preview`}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ width: "auto", height: "100%" }}
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{game.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800 border border-gray-700">
            <Rocket className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-400 font-medium">
              More games coming soon...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

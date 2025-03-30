/* eslint-disable @next/next/no-img-element */

import { Gamepad2, Gem, Rocket } from "lucide-react";
import Link from "next/link";

const games = [
  {
    name: "MINES",
    link: "/mines",
    logo: <Gem size={48} />,
    img: "/assets/mines.png",
  },
  {
    name: "DICE",
    link: "/dice",
    logo: <Rocket size={48} />,
    img: "/assets/dice.png",
  },
];

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Home page content"
    >
      <section
        className="w-full flex flex-col items-center text-center"
        aria-labelledby="welcome-heading"
      >
        <h1
          id="welcome-heading"
          className="text-4xl sm:text-6xl font-bold mb-4 flex flex-col items-center justify-center gap-2 sm:gap-3"
        >
          <div className="flex items-center gap-2 text-white">
            Welcome to <span className="text-success">Fake</span>
          </div>
          <img
            src="/assets/stake-logo.svg"
            alt="Fake Stake Logo - Play casino games with virtual currency"
            width={128}
            height={32}
            className="w-28 sm:w-32 inline-block"
          />
        </h1>
        <p className="text-xl text-gray-500">Play Real Games with Fake Money</p>
      </section>
      <section className="p-6" aria-labelledby="games-heading">
        <h3
          id="games-heading"
          className="text-xl text-white p-4 font-bold flex gap-4 items-center"
        >
          <Gamepad2 /> Play Now
        </h3>
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 w-full max-w-7xl mx-auto"
          role="list"
        >
          {games.map((game, index) => (
            <article
              key={index}
              role="listitem"
              aria-label={`${game.name} game card`}
              className="w-full"
            >
              <Link
                href={game.link}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-700 hover:border-success/50 transition-all duration-300 overflow-hidden h-48 sm:h-56 lg:h-64 w-full"
                aria-label={`Play ${game.name}`}
              >
                <div
                  className="absolute inset-0 transition-all duration-300"
                  aria-hidden="true"
                />
                <img
                  src={game.img || "/assets/coming-soon.png"}
                  alt={`${game.name} game preview image`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-success/0 group-hover:bg-success/20 transition-all duration-300"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

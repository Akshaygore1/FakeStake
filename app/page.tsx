/* eslint-disable @next/next/no-img-element */

import { Gem, Rocket } from "lucide-react";
import Link from "next/link";

const games = [
  {
    name: "MINES",
    link: "/mines",
    logo: <Gem size={48} />,
    img: "/assets/mines.png",
  },
  {
    name: "coming soon",
    link: "/",
    logo: <Rocket size={48} />,
    img: "/assets/dice.png",
  },
];

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
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
        <h2 id="games-heading" className="text-4xl p-4 font-bold mb-8">
          Play Now
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          role="list"
        >
          {games.map((game, index) => (
            <article
              key={index}
              role="listitem"
              aria-label={`${game.name} game card`}
            >
              <Link
                href={game.link}
                className="group relative flex flex-col items-center justify-center rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-success/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,98,0.1)] overflow-hidden"
                aria-label={`Play ${game.name}`}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 group-hover:to-black/60 transition-all duration-300"
                  aria-hidden="true"
                />
                <img
                  src={game.img || "/assets/coming-soon.png"}
                  alt={`${game.name} game preview image`}
                  width={200}
                  height={200}
                  className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300 brightness-50"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg group-hover:text-success transition-colors duration-300">
                    {game.name}
                  </h3>
                </div>
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

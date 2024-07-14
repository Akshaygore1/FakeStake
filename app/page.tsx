"use client";

import GameCard from "@/app/_components/GameCard";
import { Gem, Rocket } from "lucide-react";

const games = [
  {
    name: "Mines",
    link: "/mines",
    logo: <Gem size={48} />,
  },
  {
    name: "Coming Soon",
    link: "/",
    logo: <Rocket size={48} />,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="w-full flex flex-col items-center text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Fake Stake</h1>
        <p className="text-xl text-gray-500">
          Your ultimate destination for playing games
        </p>
      </section>

      <div className="relative flex place-items-center mb-12">
        <div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-br from-transparent to-green-700 opacity-10 lg:h-[360px]"></div>
        <div className="absolute -z-20 h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic from-green-400 via-green-200 blur-2xl opacity-40"></div>
        <div className="absolute h-[200px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-20 lg:h-[280px]"></div>
        <div className="absolute h-[100px] w-[200px] -translate-x-1/4 translate-y-1/4 rounded-full blur-2xl bg-gradient-to-t from-yellow-400 via-red-400 to-pink-500 opacity-30 lg:h-[140px]"></div>
        <div className="absolute h-[150px] w-[300px] translate-x-[-75%] translate-y-[75%] rounded-full blur-2xl bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 opacity-20 lg:h-[200px]"></div>
        <div className="absolute h-[120px] w-[240px] translate-x-[50%] translate-y-[-75%] rounded-full blur-2xl bg-gradient-to-l from-teal-400 via-cyan-500 to-blue-600 opacity-20 lg:h-[180px]"></div>
      </div>

      <p className="text-xl sm:text-2xl font-[40%] mb-3 text-[#a4a7a5]">
        Choose a game to play
      </p>

      <section className="w-full flex flex-wrap justify-center gap-8">
        {games.map((game, index) => (
          <GameCard
            key={index}
            link={game.link}
            logo={game.logo}
            name={game.name}
          />
        ))}
      </section>
    </main>
  );
}

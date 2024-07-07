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
      <img src="/assets/logo-no-background.svg" className="w-[40%] mb-2" />
      <section className="w-full flex flex-col text-center mb-5">
        <p className="text-2xl font-extralight italic text-[#a4a7a5]">
          Your ultimate destination for playing games
        </p>
      </section>

      <div className="relative flex place-items-center mb-12">
        <div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-br from-transparent to-green-700 opacity-10 lg:h-[360px]"></div>
        <div className="absolute -z-20 h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic from-green-400 via-green-200 blur-2xl opacity-40"></div>
      </div>

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

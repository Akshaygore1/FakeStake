/* eslint-disable @next/next/no-img-element */
"use client";

import GameCard from "@/app/_components/GameCard";
import { Gem, Rocket } from "lucide-react";
import { gameHistory } from "@/app/_constants/data";
import Footer from "./_components/Footer";
import Image from "next/image";

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
      <section className="w-full flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold mb-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          Welcome to Fake
          <Image
            src="/assets/stake-logo.svg"
            alt="Fake Logo"
            width={128}
            height={64}
            className="w-48 inline-block p-2"
            priority
          />
        </h1>
        <p className="text-xl text-gray-500">
          Your ultimate destination for playing games
        </p>
      </section>

      {/* Game Card Section */}
      {/* <section className="w-full flex flex-wrap justify-center gap-8">
        {games.map((game, index) => (
          <GameCard
            key={index}
            link={game.link}
            logo={game.logo}
            name={game.name}
          />
        ))}
      </section> */}
    </main>
  );
}

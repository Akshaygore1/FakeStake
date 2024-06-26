import GameCard from "@/app/_components/GameCard";
import { Gem, Rocket } from "lucide-react";
import Link from "next/link";

const games = [
  {
    name: "Mines",
    link: "/mines",
    logo: <Gem size={48} color="#00ff62" />,
  },
  {
    name: "Comming Soon",
    link: "/",
    logo: <Rocket size={48} color="#00ff62" />,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 justify-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Fake Stake</h1>
        <p className="text-xl text-gray-500">
          Your ultimate destination for playing games
        </p>
      </section>

      {/* Decorative Gradient Div */}
      <div className="relative flex place-items-center mb-12">
        <div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-br from-transparent to-green-700 opacity-10 lg:h-[360px]"></div>
        <div className="absolute -z-20 h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic  from-green-400 via-green-200 blur-2xl opacity-40"></div>
      </div>

      {/* Game Cards Section */}
      <section className="w-full flex flex-wrap justify-center gap-8">
        {games.map((game, index) => (
          <GameCard key={index} link={game.link} logo={game.logo} name={game.name}/>
        ))}
      </section>
    </main>
  );
}

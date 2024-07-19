"use client";

import GameCard from "@/app/_components/GameCard";
import { Gem, Rocket } from "lucide-react";
import { gameHistory } from "@/app/_constants/data";
import Footer from "./_components/Footer";

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
    <main className="flex min-h-screen flex-col items-center justify-center"  id={"Top".toLowerCase()}>
      <section className="w-full flex flex-col items-center text-center mt-28 mb-24">
        <h1 className="text-5xl font-bold mb-4">Welcome to Fake Stake</h1>
        <p className="text-xl text-gray-500">
          Your ultimate destination for playing games
        </p>
      </section>

      <div className="-z-20 fixed flex place-items-center mb-52">
        <div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-br from-transparent to-green-700 opacity-10 lg:h-[360px]"></div>
        <div className="absolute h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic from-green-400 via-green-200 blur-2xl opacity-40"></div>
        <div className="absolute h-[200px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-20 lg:h-[280px]"></div>
        <div className="absolute h-[100px] w-[200px] -translate-x-1/4 translate-y-1/4 rounded-full blur-2xl bg-gradient-to-t from-yellow-400 via-red-400 to-pink-500 opacity-30 lg:h-[140px]"></div>
        <div className="absolute h-[150px] w-[300px] translate-x-[-75%] translate-y-[75%] rounded-full blur-2xl bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 opacity-20 lg:h-[200px]"></div>
        <div className="absolute h-[120px] w-[240px] translate-x-[50%] translate-y-[-75%] rounded-full blur-2xl bg-gradient-to-l from-teal-400 via-cyan-500 to-blue-600 opacity-20 lg:h-[180px]"></div>
      </div>

      <p className="text-xl text-center sm:text-xl font-[40%] mb-3 text-[#a4a7a5]">
        Choose a game to play
      </p>

      {/* Game Card Section */}
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

      {/* History Table */}
      <section className="flex flex-col text-center mt-28 mb-24 w-[80%] lg:w-[50%] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Game History</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-opacity-50 bg-[#080b0999] backdrop-blur-[2px]">
            <thead className="bg-transparent">
              <tr>
                <th className="px-4 py-2 border border-gray-300 rounded-tl-lg">Game</th>
                <th className="px-4 py-2 border border-gray-300">Result</th>
                <th className="px-4 py-2 border border-gray-300">Profit</th>
                <th className="px-4 py-2 border border-gray-300 rounded-tr-lg">Balance</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((entry, index) => (
                <tr key={index} className="text-center bg-transparent ">
                  <td className={`px-4 py-2 border border-gray-300 ${entry.result === "Win" ? `text-green-500` : `text-red-500`}`}>{entry.gameName}</td>
                  <td className={`px-4 py-2 border border-gray-300 ${entry.result === "Win" ? `text-green-500` : `text-red-500`}`}>{entry.result}</td>
                  <td className={`px-4 py-2 border border-gray-300 ${entry.result === "Win" ? `text-green-500` : `text-red-500`}`}>{entry.amount}</td>
                  <td className={`px-4 py-2 border border-gray-300 ${entry.result === "Win" ? `text-green-500` : `text-red-500`}`}>{typeof entry.finalBalance !== "number" ? entry.finalBalance : entry.finalBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  );
}

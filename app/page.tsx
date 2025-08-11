/* eslint-disable @next/next/no-img-element */

import createFeedback from "@/action/action";
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
    name: "PLINKO",
    link: "/plinko",
    logo: <Rocket size={48} />,
    img: "/assets/plinko.png",
  },
  {
    name: "DICE",
    link: "/dice",
    logo: <Rocket size={48} />,
    img: "/assets/dice.png",
  },
  {
    name: "LIMBO",
    link: "/limbo",
    logo: <Rocket size={48} />,
    img: "/assets/limbo.avif",
  },
];

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Home page content"
    >
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

      <section
        className="w-full flex flex-col items-center text-center relative z-10 max-w-6xl mx-auto px-4"
        aria-labelledby="welcome-heading"
      >
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="text-success text-sm font-medium">
              ✨ 100% Risk-Free Gaming
            </span>
          </div>

          <h1
            id="welcome-heading"
            className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-success to-green-400 bg-clip-text text-transparent animate-pulse">
              Fake
            </span>
            <span className="text-white ml-3">Stake</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <img
              src="/assets/stake-logo.svg"
              alt="Fake Stake Logo - Play casino games with virtual currency"
              width={160}
              height={40}
              className="w-32 sm:w-40 h-auto opacity-90"
            />
            <div className="hidden sm:block w-px h-8 bg-gray-600"></div>
            <div className="text-gray-400 text-sm font-medium tracking-wide">
              VIRTUAL CASINO
            </div>
          </div>

          <p className="text-xl sm:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            Experience the{" "}
            <span className="text-white font-semibold">
              thrill of casino games
            </span>{" "}
            like
            <span className="text-success">
              {" "}
              Mines, Plinko, Dice & Limbo
            </span>{" "}
            without risking real money
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>No Real Money Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Practice Your Strategies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Unlimited Virtual Currency</span>
            </div>
          </div>
        </div>
      </section>
      <section className="p-6 relative z-10" aria-labelledby="games-heading">
        <h3
          id="games-heading"
          className="text-xl text-white p-4 font-bold flex gap-4 items-center"
        >
          <Gamepad2 /> Play Now
        </h3>
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4 w-full max-w-7xl mx-auto"
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
                className="group relative flex flex-col items-center justify-center rounded-xl border border-gray-700 hover:border-success/50 overflow-hidden h-28 sm:h-32 lg:h-36 w-full"
                aria-label={`Play ${game.name}`}
              >
                <div className="absolute inset-0" aria-hidden="true" />
                <img
                  src={game.img || "/assets/coming-soon.png"}
                  alt={`${game.name} game preview image`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-lg transform group-hover:scale-105"
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-1 bg-success/0 group-hover:bg-success/20"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <div className="text-white text-3xl relative z-10">
        Plinko is still in beta, new games coming soon...
      </div>
      <div className="max-w-md mx-auto pt-56 rounded-lg shadow-xl relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4">
          Leave Feedback / Request Features
        </h2>
        <form
          action={async (formData) => {
            "use server";
            createFeedback(formData.get("feedback") as string);
          }}
          className="space-y-4"
        >
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-300"
          >
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            maxLength={100}
            placeholder="Enter your feedback here..."
            className="w-full px-4 py-2 border border-gray-600 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-success text-black font-semibold py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </main>
  );
}

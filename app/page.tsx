/* eslint-disable @next/next/no-img-element */

import { ArrowRight, Gamepad2, Gem, Heart, Rocket } from "lucide-react";
import Link from "next/link";
import { MeshGradient } from "@paper-design/shaders-react";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
      role="main"
      aria-label="Home page content"
    >
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#5cf673", "#000000", "#000000"]}
        speed={0.4}
      />

      <section
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        aria-labelledby="welcome-heading"
      >
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <span className="text-success text-sm font-medium">
              🎰 Roulette & Blackjack Beta is Live
            </span>
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl md:leading-16 tracking-tight text-white mb-4 font-medium">
            <span className="font-medium">Welcome</span> to
            <br />
            <span className="font-medium italic font-instrument-serif tracking-tight text-success drop-shadow-success">
              Fake Stake
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-50 mt-4 mb-12 max-w-2xl mx-auto leading-relaxed italic font-instrument-serif">
            Your Casino Gaming Experience
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            className="px-8 py-3 rounded-xl bg-success text-black font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            href="/games"
          >
            Explore Games <ArrowRight size={16} />
          </Link>
          <a
            href="https://www.buymeacoffee.com/akshaygore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl border border-success text-white font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
          >
            Support the more Fun! <Heart size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

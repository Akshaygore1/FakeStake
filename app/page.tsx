/* eslint-disable @next/next/no-img-element */

import { ArrowRight, Gamepad2, Gem, Heart, Rocket } from "lucide-react";
import Link from "next/link";

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
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
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
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight"
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

          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the thrill of casino gaming without risking real money.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            className="px-8 py-3 rounded-full bg-success text-black font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
            href="/games"
          >
            Explore Games <ArrowRight size={16} />
          </Link>
          <a
            href="https://www.buymeacoffee.com/akshaygore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-success text-white font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
          >
            Donate <Heart size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

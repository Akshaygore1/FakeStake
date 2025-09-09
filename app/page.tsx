/* eslint-disable @next/next/no-img-element */

import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 p-8">
      <main
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
        role="main"
        aria-label="Home page content"
      >
        <section
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          aria-labelledby="welcome-heading"
        >
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-600/20 border border-green-600/30 mb-6">
              <span className="text-green-400 text-sm font-medium">
                ✨ 100% Risk-Free Gaming
              </span>
            </div>

            <h1
              id="welcome-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight"
            >
              <span className="text-white">
                Welcome to
              </span>
              <br />
              <span className="text-green-400">
                FakeStake
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience the thrill of casino gaming without risking real money.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              className="px-8 py-4 rounded-full bg-green-600 text-black font-semibold hover:bg-green-500 transition-colors duration-200 flex items-center gap-2 text-lg"
              href="/games"
            >
              Explore Games <ArrowRight size={20} />
            </Link>
            <a
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full border border-green-600 text-white font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 text-lg"
            >
              Support the Fun! <Heart size={20} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

import { IconArrowRight, IconCoffee } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { SITE_URL } from "@/config/site";
import { SEO } from "@/lib/seo";
import MeshGradientBackground from "@/components/layout/MeshGradientBackground";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fake Stake",
    description:
      "Free online casino games platform with virtual currency. Play Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip games without real money.",
    url: SITE_URL,
    applicationCategory: "GameApplication",
    genre: "Casino Games",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <>
      <SEO
        title="Fake Stake - Free Online Casino Games | Play Mines, Plinko, Roulette, Blackjack & More"
        description="Play the best free casino games online! Experience Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip games with virtual currency. No real money, no risk - pure entertainment and practice."
        url={SITE_URL}
        keywords={[
          "fake stake",
          "free casino games",
          "online casino games free",
          "practice casino games",
          "mines game online",
          "plinko game free",
          "dice game casino",
          "limbo game",
          "roulette game free",
          "blackjack free",
          "flip game casino",
          "virtual currency casino",
        ]}
        structuredData={jsonLd}
      />
      <main
        className="flex min-h-screen flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-label="Home page content"
      >
        <MeshGradientBackground
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#5cf673", "#000000", "#000000"]}
          speed={1}
        />

        <section
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
          aria-labelledby="welcome-heading"
        >
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-sm bg-success/10 border border-success/20 mb-6">
              <span className="text-success text-sm font-medium">
                🎉 New Snake Game added 🐉
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
              to="/games"
            >
              Explore Games <IconArrowRight size={16} />
            </Link>
            <a
              href="https://www.buymeacoffee.com/akshaygore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl border bg-amber-300 border-success text-black font-semibold hover:bg-amber-400 transition-colors duration-200 flex items-center gap-2"
            >
              Buy me a Coffee! <IconCoffee size={16} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

import { IconRocket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { gameCards } from "@/config/games";
import { SITE_URL } from "@/config/site";
import { SEO } from "@/lib/seo";

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Casino Games",
    description: "Collection of free online casino games",
    itemListElement: gameCards.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Game",
        name: game.name,
        description: game.description,
        url: `${SITE_URL}${game.path}`,
        gamePlatform: "Web Browser",
        genre: "Casino Game",
      },
    })),
  };

  return (
    <>
      <SEO
        title="All Casino Games - Free Play | Mines, Plinko, Roulette, Dice & More"
        description="Browse all free casino games on Fake Stake. Play Mines, Plinko, Dice, Limbo, Roulette, Blackjack, and Flip games online with virtual currency. No downloads, no real money required."
        url={`${SITE_URL}/games`}
        keywords={[
          "casino games",
          "free casino games",
          "online casino",
          "play casino free",
          "casino games list",
        ]}
        structuredData={jsonLd}
      />
      <main className="min-h-screen relative">
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
              <span className="text-success text-sm font-medium">
                New Games are coming soon
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              <span className="text-white font-medium text-transparent font-figtree">
                Casino
              </span>
              <span className="bg-gradient-to-r from-success to-green-400 bg-clip-text text-transparent ml-3 italic font-instrument-serif">
                Games
              </span>
            </h1>

            <p className="text-2xl text-gray-50 max-w-2xl mx-auto italic font-instrument-serif">
              Experience the thrill of casino gaming with our collection of
              popular games. All games are{" "}
              <span className="text-success font-semibold">
                100% free to play
              </span>{" "}
              with virtual currency.
            </p>
          </div>

          <div className="flex flex-row justify-center items-center gap-4 max-w-6xl flex-wrap mx-auto">
            {gameCards.map((game) => (
              <Link
                key={game.name}
                to={game.path}
                className="relative h-48 flex items-center justify-center bg-black/30"
              >
                <img
                  src={game.image}
                  alt={`${game.name} game preview`}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{ width: "auto", height: "100%" }}
                />
              </Link>
            ))}
          </div>
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3  font-instrument-serif text-xl">
              <IconRocket className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-success font-medium">
                More games coming soon...
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

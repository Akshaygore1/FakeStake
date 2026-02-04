import { MetadataRoute } from "next";

export const dynamic = 'force-static';
export const revalidate = false;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fake Stake - Free Online Casino Games",
    short_name: "Fake Stake",
    description:
      "Play free casino games online with virtual currency. Features Mines, Plinko, Dice, Limbo, Roulette, Blackjack & Flip games.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#5cf673",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["games", "entertainment"],
    lang: "en",
    orientation: "portrait-primary",
  };
}

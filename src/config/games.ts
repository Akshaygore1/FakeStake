import { ASSET_BASE_URL, SITE_URL } from "@/config/site";

export interface GameCard {
  name: string;
  path: string;
  image: string;
  description: string;
}

export interface GameSeoConfig {
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

export const gameCards: GameCard[] = [
  {
    name: "MINES",
    path: "/mines",
    image: `${ASSET_BASE_URL}/mine.webp`,
    description: "Test your luck and strategy in the Mines game",
  },
  {
    name: "PLINKO",
    path: "/plinko",
    image: `${ASSET_BASE_URL}/plinko.webp`,
    description: "Watch the ball drop in this exciting Plinko game",
  },
  {
    name: "DICE",
    path: "/dice",
    image: `${ASSET_BASE_URL}/dice.webp`,
    description: "Roll the dice and win big in this classic game",
  },
  {
    name: "LIMBO",
    path: "/limbo",
    image: `${ASSET_BASE_URL}/limbo.webp`,
    description: "How high can you go in Limbo?",
  },
  {
    name: "ROULETTE",
    path: "/roulette",
    image: `${ASSET_BASE_URL}/roulette.webp`,
    description: "Spin the wheel and place your bets",
  },
  {
    name: "BLACKJACK",
    path: "/blackjack",
    image: `${ASSET_BASE_URL}/blackjack.webp`,
    description: "Beat the dealer in classic Blackjack",
  },
  {
    name: "FLIP",
    path: "/flip",
    image: `${ASSET_BASE_URL}/flip.jpg`,
    description: "Flip the coin and test your luck",
  },
  {
    name: "DRAGON TOWER",
    path: "/dragontower",
    image: `${ASSET_BASE_URL}/dragon.webp`,
    description: "Climb the tower and dodge the skulls to keep winning",
  },
  {
    name: "SNAKE",
    path: "/snake",
    image: `${ASSET_BASE_URL}/snake.webp`,
    description: "Survive longer in a casino-style Snake challenge",
  },
];

export const gameSeo: Record<string, GameSeoConfig> = {
  blackjack: {
    title: "Blackjack Game Free - Play Online Casino Blackjack",
    description:
      "Play Blackjack online for free with virtual currency! Beat the dealer in this classic card game. No real money required - practice your strategy risk-free.",
    url: `${SITE_URL}/blackjack`,
    keywords: [
      "blackjack game",
      "free blackjack",
      "online blackjack",
      "casino blackjack",
      "blackjack game free",
      "play blackjack online",
      "21 game",
    ],
  },
  dice: {
    title: "Dice Game Free - Play Online Casino Dice",
    description:
      "Play Dice game online for free! Roll the dice and win with virtual currency. Classic casino dice game with no real money required. 100% risk-free fun.",
    url: `${SITE_URL}/dice`,
    keywords: [
      "dice game",
      "free dice game",
      "online dice",
      "casino dice",
      "dice game free",
      "play dice online",
    ],
  },
  dragontower: {
    title: "Dragon Tower Game Free - Play Online Casino Dragon Tower",
    description:
      "Climb the Dragon Tower for free with virtual currency and test your nerve in this high-risk casino game.",
    url: `${SITE_URL}/dragontower`,
    keywords: [
      "dragon tower",
      "dragon tower game",
      "free dragon tower",
      "casino tower game",
    ],
  },
  flip: {
    title: "Flip Game Free - Play Online Casino Coin Flip",
    description:
      "Play Flip game online for free with virtual currency! Simple yet exciting coin flip casino game. No real money required - 100% risk-free entertainment.",
    url: `${SITE_URL}/flip`,
    keywords: [
      "flip game",
      "coin flip game",
      "free flip game",
      "online flip",
      "casino flip",
      "flip game free",
      "play flip online",
    ],
  },
  limbo: {
    title: "Limbo Game Free - Play Online Casino Limbo",
    description:
      "Play Limbo game online for free with virtual currency! Push your limits in this exciting casino game. No real money, pure entertainment and strategy.",
    url: `${SITE_URL}/limbo`,
    keywords: [
      "limbo game",
      "free limbo game",
      "online limbo",
      "casino limbo",
      "limbo game free",
      "play limbo online",
    ],
  },
  mines: {
    title: "Mines Game Free - Play Online Casino Mines",
    description:
      "Play Mines game online for free with virtual currency! Test your luck and strategy in this exciting casino game. No real money required - 100% risk-free entertainment.",
    url: `${SITE_URL}/mines`,
    keywords: [
      "mines game",
      "free mines game",
      "online mines",
      "casino mines",
      "mines game free",
      "play mines online",
    ],
  },
  plinko: {
    title: "Plinko Game Free - Play Online Casino Plinko",
    description:
      "Play Plinko online for free with virtual currency and watch the ball bounce through a dynamic physics board.",
    url: `${SITE_URL}/plinko`,
    keywords: [
      "plinko game",
      "free plinko game",
      "online plinko",
      "casino plinko",
      "play plinko online",
    ],
  },
  roulette: {
    title: "Roulette Game Free - Play Online Casino Roulette",
    description:
      "Play Roulette online for free with virtual currency! Spin the wheel and place your bets in this classic casino game. No real money required - pure entertainment.",
    url: `${SITE_URL}/roulette`,
    keywords: [
      "roulette game",
      "free roulette",
      "online roulette",
      "casino roulette",
      "roulette game free",
      "play roulette online",
    ],
  },
  snake: {
    title: "Snake Game Free - Play Online Casino Snake",
    description:
      "Play Snake on Fake Stake with free virtual currency and a casino-style risk system.",
    url: `${SITE_URL}/snake`,
    keywords: [
      "snake game",
      "free snake game",
      "casino snake",
      "play snake online",
    ],
  },
};

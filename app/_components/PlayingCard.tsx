import { cn } from "@/lib/utils";

export type Card = {
  value: number;
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  display: string;
};

interface PlayingCardProps {
  card: Card;
  className?: string;
}

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const suitColors = {
  hearts: "text-red-500",
  diamonds: "text-red-500",
  clubs: "text-gray-900 dark:text-gray-100",
  spades: "text-gray-900 dark:text-gray-100",
};

export function PlayingCard({ card, className }: PlayingCardProps) {
  // console.log(card);
  const suitSymbol = suitSymbols[card.suit];
  const suitColor = suitColors[card.suit];

  return (
    <div
      className={cn(
        "relative w-24 h-36 bg-white dark:bg-gray-50 rounded-lg border-2 border-gray-300 shadow-md",
        "flex flex-col justify-between p-2 select-none transition-transform hover:scale-105",
        className
      )}
    >
      {/* Top left corner */}
      <div
        className={cn(
          "flex flex-col items-center text-sm font-bold self-start",
          suitColor
        )}
      >
        <span className="leading-none">{card.display}</span>
        <span className="text-lg leading-none">{suitSymbol}</span>
      </div>

      {/* Center suit symbol */}
      <div
        className={cn("flex items-center justify-center text-4xl", suitColor)}
      >
        {suitSymbol}
      </div>

      {/* Bottom right corner (rotated) */}
      <div
        className={cn(
          "flex flex-col items-center text-sm font-bold rotate-180 self-end",
          suitColor
        )}
      >
        <span className="leading-none">{card.display}</span>
        <span className="text-lg leading-none">{suitSymbol}</span>
      </div>
    </div>
  );
}

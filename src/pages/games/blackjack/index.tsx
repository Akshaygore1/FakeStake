import BlackjackContainer from "./components/BlackjackContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function BlackjackPage() {
  return (
    <GameRoute seo={gameSeo.blackjack}>
      <BlackjackContainer />
    </GameRoute>
  );
}

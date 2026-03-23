import SnakeContainer from "./components/SnakeContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function SnakePage() {
  return (
    <GameRoute seo={gameSeo.snake}>
      <SnakeContainer />
    </GameRoute>
  );
}

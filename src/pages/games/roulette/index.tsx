import RouletteContainer from "./components/RouletteContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function Roulette() {
  return (
    <GameRoute seo={gameSeo.roulette}>
      <RouletteContainer />
    </GameRoute>
  );
}

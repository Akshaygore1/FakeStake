import FlipGameContainer from "./components/FlipContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function FlipPage() {
  return (
    <GameRoute seo={gameSeo.flip}>
      <FlipGameContainer />
    </GameRoute>
  );
}

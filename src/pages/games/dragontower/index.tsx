import DragonTowerContainer from "./components/DragonContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function DragonTowerPage() {
  return (
    <GameRoute seo={gameSeo.dragontower}>
      <DragonTowerContainer />
    </GameRoute>
  );
}

import MineContainer from "./components/MineContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function Mines() {
  return (
    <GameRoute seo={gameSeo.mines}>
      <MineContainer />
    </GameRoute>
  );
}

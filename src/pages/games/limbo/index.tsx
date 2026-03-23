import LimboContainer from "./components/LimboContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function Limbo() {
  return (
    <GameRoute seo={gameSeo.limbo}>
      <LimboContainer />
    </GameRoute>
  );
}

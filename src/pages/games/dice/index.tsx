import DiceGameContainer from "./components/DiceGameContainer";
import GameRoute from "@/components/game/GameRoute";
import { gameSeo } from "@/config/games";

export default function Dice() {
  return (
    <GameRoute seo={gameSeo.dice}>
      <DiceGameContainer />
    </GameRoute>
  );
}

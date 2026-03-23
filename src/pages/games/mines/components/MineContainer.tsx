import ConfigComponent from "./ConfigComponent";
import GridComponent from "./GridComponent";
import GameContainer from "@/components/game/GameContainer";

export default function MineContainer() {
  return (
    <GameContainer
      configComponent={<ConfigComponent />}
      gameComponent={<GridComponent />}
    />
  );
}

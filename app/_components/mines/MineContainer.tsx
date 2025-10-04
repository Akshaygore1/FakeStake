import ConfigComponent from "./ConfigComponent";
import GridComponent from "./GridComponent";
import GameContainer from "../GameContainer";

export default function MineContainer() {
  return (
    <GameContainer
      configComponent={<ConfigComponent />}
      gameComponent={<GridComponent />}
    />
  );
}

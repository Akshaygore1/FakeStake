import RouletteComponent from "./RouletteComponent";
import RouletteConfig from "./RouletteConfig";
import GameContainer from "@/app/_components/GameContainer";

export default function RouletteContainer() {
  return (
    <GameContainer
      configComponent={<RouletteConfig />}
      gameComponent={<RouletteComponent />}
    />
  );
}

"use client";
import SnakeComponent from "./SnakeComponent";
import SnakeConfig from "./SnakeConfig";
import GameContainer from "@/components/game/GameContainer";

function SnakeContainer() {
  return (
    <GameContainer
      configComponent={<SnakeConfig />}
      gameComponent={<SnakeComponent />}
    />
  );
}

export default SnakeContainer;

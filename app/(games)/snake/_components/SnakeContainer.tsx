"use client";
import SnakeComponent from "./SnakeComponent";
import SnakeConfig from "./SnakeConfig";
import { useSnakeStore } from "@/stores/game/snake.store";
import { useCommonStore } from "@/stores/common.store";
import GameContainer from "@/app/_components/GameContainer";

function SnakeContainer() {
  return (
    <GameContainer
      configComponent={<SnakeConfig />}
      gameComponent={<SnakeComponent />}
    />
  );
}

export default SnakeContainer;

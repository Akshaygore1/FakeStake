"use client";
import SnakeComponent from "./SnakeComponent";
import SnakeConfig from "./SnakeConfig";
import { useSnakeStore } from "@/store/snakeStore";
import { useCommonStore } from "@/store/commonStore";
import GameContainer from "../GameContainer";

function SnakeContainer() {
  return (
    <GameContainer
      configComponent={<SnakeConfig />}
      gameComponent={<SnakeComponent />}
    />
  );
}

export default SnakeContainer;

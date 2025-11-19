"use client";

import FlipGameConfig from "./FlipConfig";
import FlipGame from "./FlipGame";
import GameContainer from "../GameContainer";

export default function FlipGameContainer() {
  return (
    <GameContainer
      configComponent={<FlipGameConfig />}
      gameComponent={<FlipGame />}
      className="m-4 min-h-[calc(100vh-200px)]"
    />
  );
}

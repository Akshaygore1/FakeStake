"use client";

import GameContainer from "../GameContainer";
import DragonConfig from "./DragonConfig";

export default function DragonTowerContainer() {
  return (
    <GameContainer
      configComponent={<DragonConfig />}
      gameComponent={<div>Game</div>}
      className="m-4 min-h-[calc(100vh-200px)]"
    />
  );
}

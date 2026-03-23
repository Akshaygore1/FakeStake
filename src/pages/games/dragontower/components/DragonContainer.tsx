"use client";

import GameContainer from "@/components/game/GameContainer";
import DragonComponent from "./DragonComponent";
import DragonConfig from "./DragonConfig";

export default function DragonTowerContainer() {
  return (
    <GameContainer
      configComponent={<DragonConfig />}
      gameComponent={<DragonComponent />}
      className="m-4 min-h-[calc(100vh-200px)]"
    />
  );
}

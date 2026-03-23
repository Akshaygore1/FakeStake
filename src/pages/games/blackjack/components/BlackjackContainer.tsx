"use client";
import BlackjackGame from "./BlackjackGame";
import BlackjackConfig from "./BlackjackConfig";
import GameContainer from "@/components/game/GameContainer";

function BlackjackContainer() {
  return (
    <GameContainer
      configComponent={<BlackjackConfig />}
      gameComponent={<BlackjackGame />}
      className="m-4 min-h-[calc(100vh-200px)]"
    />
  );
}

export default BlackjackContainer;

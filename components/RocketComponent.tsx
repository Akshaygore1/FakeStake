"use client";

import { useEffect, useState } from "react";
import { useCommonStore } from "@/store/commonStore";
import { useRockerConfig } from "@/store/rocketConfig";

export default function RocketComponent() {
  const { setMultiplier, multiplier } = useCommonStore();
  const [localMultiplier, setLocalMultiplier] = useState<number>(multiplier);
  const { gameStarted, setGameStarted, resetGame } = useRockerConfig();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let randomStop = Math.random() * 50;

    if (gameStarted) {
      interval = setInterval(() => {
        setLocalMultiplier((prev) => prev + 0.1);
      }, 100);
    }

    if (localMultiplier >= randomStop && gameStarted) {
      clearInterval(interval);
      setGameStarted(false);
      setLocalMultiplier(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      console.log("THIS IS END");
    };
  }, [gameStarted, localMultiplier, setGameStarted]);

  useEffect(() => {
    if (gameStarted) {
      setMultiplier(localMultiplier);
    } else {
      console.log("---", localMultiplier);
      resetGame();
      setLocalMultiplier(0);
    }
  }, [localMultiplier, setMultiplier, gameStarted, resetGame]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="text-6xl">{localMultiplier.toFixed(2)}</div>
    </div>
  );
}

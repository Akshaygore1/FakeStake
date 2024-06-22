"use client";

import { useEffect, useState } from "react";
import { useCommonStore } from "@/store/commonStore";
import { useRockerConfig } from "@/store/rocketConfig";

export default function RocketComponent() {
  const { multiplier, setMultiplier } = useCommonStore();
  const [localMultiplier, setLocalMultiplier] = useState<number>(0);
  const { gameStarted, setGameStarted } = useRockerConfig();
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (gameStarted) {
      interval = setInterval(() => {
        setLocalMultiplier((prev) => prev + 0.1);
      }, 100);
    }

    const randomStop = Math.random() * 50;
    if (localMultiplier >= randomStop) {
      clearInterval(interval);
      setGameStarted(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, localMultiplier]);

  useEffect(() => {
    setMultiplier(localMultiplier);
  }, [localMultiplier, setMultiplier]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="text-6xl">{localMultiplier.toFixed(2)}</div>
      {!gameStarted && (
        <button
          onClick={() => {
            setLocalMultiplier(1);
            setGameStarted(true);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Restart
        </button>
      )}
    </div>
  );
}

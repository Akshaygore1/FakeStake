"use client";

import { useEffect, useState } from "react";
import { useCommonStore } from "@/store/commonStore";
import { useRockerConfig } from "@/store/rocketConfig";
import { RocketChart } from "./RocketChart";

export default function RocketComponent() {
  const { multiplier, setMultiplier } = useCommonStore();
  const [localMultiplier, setLocalMultiplier] = useState<number>(0);
  const [localMultiplierGraph, setLocalMultiplierGraph] = useState<number[]>([]);
  const { gameStarted, setGameStarted } = useRockerConfig();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (gameStarted) {
      interval = setInterval(() => {
        setLocalMultiplier((prev) => {
          const newMultiplier = prev + 0.1;
          setLocalMultiplierGraph((prevGraph) => [...prevGraph, newMultiplier]);
          return newMultiplier;
        });
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

      {localMultiplierGraph.length > 0 && (
        <RocketChart data={localMultiplierGraph} />
      )}

      {!gameStarted && (
        <button
          onClick={() => {
            setLocalMultiplier(0);
            setLocalMultiplierGraph([]);
            setGameStarted(true); // Set to true to start the game when button is clicked
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Restart
        </button>
      )}
    </div>
  );
}

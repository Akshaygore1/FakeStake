"use client";
import React, { useRef, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import PlinkoEngine from "./plinkoEngine";
import BinsRow from "./BinsRow";
// import BinsRow from './BinsRow';
// import LastWins from './LastWins';
// import PlinkoEngine from './PlinkoEngine';

// Assuming these are imported from your game store/context
// You'll need to create a context or state management for plinkoEngine
// import { usePlinkoStore } from '../stores/game'; // Adjust import path as needed

const { WIDTH, HEIGHT } = PlinkoEngine;

const PlinkoGame = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plinkoEngine, setPlinkoEngine] = useState<PlinkoEngine>(); // Assuming you have a store/context
  const [width, setWidth] = useState(0);
  const [multipliers, setMultipliers] = useState<number[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new PlinkoEngine(canvasRef.current);
      setPlinkoEngine(engine);
      setWidth(engine.binsWidthPercentage);
      setMultipliers(engine.getMultipliers());

      engine.start();

      // Cleanup function
      return () => {
        engine?.stop();
      };
    }
  }, [setPlinkoEngine]);

  return (
    <div className="relative bg-background">
      <button
        className="bg-red-500"
        onClick={() => {
          plinkoEngine && plinkoEngine.dropBall();
        }}
      >
        Add Ball
      </button>
      <div
        className="mx-auto flex h-full flex-col px-4 pb-4"
        style={{ maxWidth: `${WIDTH}px` }}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
        >
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="h-full w-full"
          />
        </div>
        {plinkoEngine && (
          <BinsRow
            rowCount={plinkoEngine.rowCountOfEngine}
            riskLevel={"MEDIUM"}
            binsWidth={plinkoEngine.binsWidthPercentage}
          />
        )}
      </div>
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2">
        <div className="text-sm text-white">
          {multipliers.map((multiplier, index) => (
            <div key={index} className="mb-1">
              {multiplier}x
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlinkoGame;

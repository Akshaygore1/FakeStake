"use client";
import BinsRow from "@/app/_components/plinko/BinsRow";
import PlinkoConfig from "@/app/_components/plinko/PlinkoConfig";
import PlinkoEngine from "@/app/_components/plinko/plinkoEngine";
import PlinkoGame from "@/app/_components/plinko/PlinkoGame";
import PlinkoGames from "@/app/_components/plinko/PlinkoGames";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const { WIDTH, HEIGHT } = PlinkoEngine;

export default function Dice() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plinkoEngine, setPlinkoEngine] = useState<PlinkoEngine>(); // Assuming you have a store/context
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new PlinkoEngine(canvasRef.current);
      setPlinkoEngine(engine);
      setWidth(engine.binsWidthPercentage);

      engine.start();

      // Cleanup function
      return () => {
        engine?.stop();
      };
    }
  }, [setPlinkoEngine]);
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1">
        <div className="flex justify-center items-center w-full p-4">
          <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
            <div className="w-full md:w-1/3 bg-primary">
              <PlinkoConfig
                dropBall={() => {
                  plinkoEngine && plinkoEngine.dropBall();
                }}
              />
            </div>
            <div className="relative bg-background">
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
                {/* <LastWins /> */}
                {plinkoEngine && <div className="text-red-500"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

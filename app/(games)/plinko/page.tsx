"use client";
import BinsRow from "./_components/BinsRow";
import PlinkoConfig from "./_components/PlinkoConfig";
import { usePlinkoStore } from "@/stores/game/plinko.store";
import { useRef, useEffect, useState, useCallback } from "react";

// Constants for canvas dimensions (same as PlinkoEngine)
const WIDTH = 760;
const HEIGHT = 570;

// Type for the dynamically imported engine
type PlinkoEngineType = import("./_components/plinkoEngine").default;

export default function Plinko() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plinkoEngine, setPlinkoEngine] = useState<PlinkoEngineType | null>(null);
  const [isEngineLoading, setIsEngineLoading] = useState(true);
  const { rowCount, riskLevel } = usePlinkoStore();

  // Dynamically import and initialize the engine
  useEffect(() => {
    let engine: PlinkoEngineType | null = null;
    let mounted = true;

    const initEngine = async () => {
      if (!canvasRef.current) return;

      setIsEngineLoading(true);
      
      // Dynamic import - Matter.js only loads when Plinko page is visited
      const { default: PlinkoEngine } = await import(
        "./_components/plinkoEngine"
      );

      if (!mounted || !canvasRef.current) return;

      engine = new PlinkoEngine(canvasRef.current);
      setPlinkoEngine(engine);
      engine.start();
      setIsEngineLoading(false);
    };

    initEngine();

    // Cleanup function
    return () => {
      mounted = false;
      engine?.stop();
    };
  }, [rowCount, riskLevel]);
  const handleDropBall = useCallback(() => {
    plinkoEngine?.dropBall();
  }, [plinkoEngine]);

  return (
    <main className="flex flex-col min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row w-full flex-1">
        <div className="flex justify-center items-center w-full p-4">
          <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
            <div className="w-full md:w-1/3 bg-primary">
              <PlinkoConfig dropBall={handleDropBall} />
            </div>
            <div className="relative bg-background">
              <div
                className="mx-auto flex h-full flex-col px-4 pb-4"
                style={{ maxWidth: `${WIDTH}px` }}
              >
                {isEngineLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                    <div className="text-white">Loading game engine...</div>
                  </div>
                )}
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
                    rowCount={rowCount}
                    riskLevel={riskLevel}
                    binsWidth={plinkoEngine.binsWidthPercentage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

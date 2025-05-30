"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Matter from "matter-js";
// import { useMediaQuery } from "@/hooks/use-media-query"
import { getRandomBetween } from "./utils";
import BinsRow from "./BinsRow";

export default function PlinkoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [score, setScore] = useState(0);
  const [multipliers, setMultipliers] = useState<number[]>([]);
  const [bucketWidth, setBucketWidth] = useState(0);
  // const isMobile = useMediaQuery("(max-width: 640px)")

  const MULTIPLIERS = [
    "10x",
    "3x",
    "1.6x",
    "1.4x",
    "1.1x",
    "1x",
    "0.5x",
    "0.5x",
    "1x",
    "1.1x",
    "1.4x",
    "1.6x",
    "3x",
    "10x",
  ];

  // Constants for the game
  const BASE_WIDTH = 760;
  const BASE_HEIGHT = 570;
  const [canvasWidth, setCanvasWidth] = useState(BASE_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(BASE_HEIGHT);
  const ROWS = 8;
  const BUCKET_HEIGHT = 30;
  const PADDING_X = 52;
  const PADDING_TOP = 36;
  const PADDING_BOTTOM = 28;
  const PIN_CATEGORY = 0x0001;
  const BALL_CATEGORY = 0x0002;
  const BUCKET_CATEGORY = 0x0004;

  const BUCKET_COLORS = [
    "#ff023f",
    "#ff402a",
    "#ff6b21",
    "#ff8717",
    "#ffa009",
    "#ffc000",
    "#ffdc00",
    "#ffdc00",
    "#ffc000",
    "#ffa009",
    "#ff8717",
    "#ff6b21",
    "#ff402a",
    "#ff023f",
  ];

  const frictionAirByRowCount = {
    8: 0.0395,
    9: 0.041,
    10: 0.038,
    11: 0.0355,
    12: 0.0414,
    13: 0.0437,
    14: 0.0401,
    15: 0.0418,
    16: 0.0364,
  };

  const pinDistanceX = (): number => {
    const lastRowPinCount = 3 + ROWS - 1;
    return (canvasWidth - PADDING_X * 2) / (lastRowPinCount - 1);
  };

  // Handle resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!containerRef.current) return

  //     const containerWidth = containerRef.current.clientWidth
  //     const newWidth = Math.min(containerWidth, BASE_WIDTH)
  //     const newHeight = (newWidth / BASE_WIDTH) * BASE_HEIGHT

  //     setCanvasWidth(newWidth)
  //     setCanvasHeight(newHeight)

  //     // Update the renderer if it exists
  //     if (renderRef.current) {
  //       renderRef.current.options.width = newWidth
  //       renderRef.current.options.height = newHeight
  //       renderRef.current.canvas.width = newWidth
  //       renderRef.current.canvas.height = newHeight
  //       Matter.Render.setPixelRatio(renderRef.current, window.devicePixelRatio)
  //     }

  //     // Recreate the physics world with new dimensions
  //     if (engineRef.current && renderRef.current) {
  //       resetGame()
  //       setupPhysicsWorld()
  //     }
  //   }

  //   window.addEventListener("resize", handleResize)
  //   handleResize() // Initial setup

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [isMobile])

  // Initialize the physics engine and renderer
  const setupPhysicsWorld = () => {
    if (!canvasRef.current) return;

    // Clear existing engine if it exists
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    // Create engine and renderer
    const engine = Matter.Engine.create({
      timing: {
        timeScale: 1,
      },
    });

    engine.world.gravity.y = 0.8;

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        background: "#0f1728",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    engineRef.current = engine;
    renderRef.current = render;

    // Create the pegs in a triangle pattern
    const pins = [];
    const walls = [];
    const pinsLastRowXCoords = [];
    const pinRadius = Math.max(2, (24 - ROWS) / 2);

    for (let row = 0; row < ROWS; ++row) {
      const rowY =
        PADDING_TOP +
        ((canvasHeight - PADDING_TOP - PADDING_BOTTOM) / (ROWS - 1)) * row;

      const rowPaddingX = PADDING_X + ((ROWS - 1 - row) * pinDistanceX()) / 2;

      for (let col = 0; col < 3 + row; ++col) {
        const colX =
          rowPaddingX + ((canvasWidth - rowPaddingX * 2) / (3 + row - 1)) * col;
        const pin = Matter.Bodies.circle(colX, rowY, pinRadius, {
          isStatic: true,
          render: {
            fillStyle: "#ffffff",
          },
          collisionFilter: {
            category: PIN_CATEGORY,
            mask: BALL_CATEGORY,
          },
        });
        pins.push(pin);

        if (row === ROWS - 1) {
          pinsLastRowXCoords.push(colX);
        }
      }
    }

    // Create walls
    const firstPinX = pins[0].position.x;
    const leftWallAngle = Math.atan2(
      firstPinX - pinsLastRowXCoords[0],
      canvasHeight - PADDING_TOP - PADDING_BOTTOM
    );
    const leftWallX =
      firstPinX -
      (firstPinX - pinsLastRowXCoords[0]) / 2 -
      pinDistanceX() * 0.25;

    const leftWall = Matter.Bodies.rectangle(
      leftWallX,
      canvasHeight / 2,
      10,
      canvasHeight,
      {
        isStatic: true,
        angle: leftWallAngle,
        render: { fillStyle: "#ffffff", visible: false },
        collisionFilter: {
          category: PIN_CATEGORY,
          mask: BALL_CATEGORY,
        },
      }
    );

    const rightWall = Matter.Bodies.rectangle(
      canvasWidth - leftWallX,
      canvasHeight / 2,
      10,
      canvasHeight,
      {
        isStatic: true,
        angle: -leftWallAngle,
        render: { fillStyle: "#ffffff", visible: false },
        collisionFilter: {
          category: PIN_CATEGORY,
          mask: BALL_CATEGORY,
        },
      }
    );
    walls.push(leftWall, rightWall);
    console.log("pinsLastRowXCoords", pinsLastRowXCoords);
    const lastPinX = pinsLastRowXCoords[pinsLastRowXCoords.length - 1];
    setBucketWidth((lastPinX - pinsLastRowXCoords[0]) / BASE_WIDTH);
    // return ((lastPinX - this.pinsLastRowXCoords[0]) / PlinkoEngine.WIDTH);

    const sensor = Matter.Bodies.rectangle(
      BASE_WIDTH / 2,
      BASE_HEIGHT,
      BASE_WIDTH,
      10,
      {
        isSensor: true,
        isStatic: true,
        render: {
          visible: false,
        },
      }
    );

    // Add all bodies to the world
    Matter.Composite.add(engine.world, [...pins, ...walls, sensor]);

    // Start the renderer
    Matter.Render.run(render);

    // Create runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Collision detection for scoring
    Matter.Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];

        // Check if a ball has hit a bucket sensor
        if (
          (pair.bodyA.label?.startsWith("bucket-") &&
            pair.bodyB.label === "ball") ||
          (pair.bodyB.label?.startsWith("bucket-") &&
            pair.bodyA.label === "ball")
        ) {
          const bucketBody = pair.bodyA.label?.startsWith("bucket-")
            ? pair.bodyA
            : pair.bodyB;
          const ballBody =
            pair.bodyA.label === "ball" ? pair.bodyA : pair.bodyB;

          const bucketIndex = Number.parseInt(bucketBody.label!.split("-")[1]);

          // Get multiplier value
          const multiplierText = MULTIPLIERS[bucketIndex];
          const multiplier = Number.parseFloat(multiplierText.replace("x", ""));
          setMultipliers((prev) => [...prev, multiplier]);

          // Base points
          const basePoints = 10;
          const points = Math.round(basePoints * multiplier);

          // Update score
          setScore((prevScore) => prevScore + points);

          // Remove the ball after a short delay
          setTimeout(() => {
            Matter.Composite.remove(engine.world, ballBody);
          }, 500);
        }
      }
    });

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  };

  // Initialize physics world
  useEffect(() => {
    const cleanup = setupPhysicsWorld();
    return cleanup;
  }, [canvasWidth, canvasHeight]);

  // Function to drop a ball
  const dropBall = () => {
    if (!engineRef.current) return;

    const ballOffsetRangeX = pinDistanceX() * 0.8;
    const ballRadius = ((24 - ROWS) / 2) * 2;

    // const ballOffsetRangeX = this.pinDistanceX * 0.8;
    // const ballRadius = this.pinRadius * 2;

    // Create a ball
    const ball = Matter.Bodies.circle(
      getRandomBetween(
        canvasWidth / 2 - ballOffsetRangeX,
        canvasWidth / 2 + ballOffsetRangeX
      ),
      0,
      ballRadius,
      {
        restitution: 0.8,
        friction: 0.5,
        frictionAir:
          frictionAirByRowCount[ROWS as keyof typeof frictionAirByRowCount] ||
          0.04,
        label: "ball",
        collisionFilter: {
          category: BALL_CATEGORY,
          mask: PIN_CATEGORY | BUCKET_CATEGORY,
        },
        render: {
          fillStyle: "#f43f5e",
        },
      }
    );

    // Add the ball to the world
    Matter.Composite.add(engineRef.current.world, [ball]);
  };

  // Function to reset the game
  const resetGame = () => {
    setScore(0);
    setMultipliers([]);

    // Remove all balls
    if (engineRef.current) {
      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      const balls = bodies.filter((body) => body.label === "ball");
      Matter.Composite.remove(engineRef.current.world, balls);
    }
  };
  // const lastPinX = this.pinsLastRowXCoords[this.pinsLastRowXCoords.length - 1];
  //       return ((lastPinX - this.pinsLastRowXCoords[0]) / PlinkoEngine.WIDTH);
  return (
    <div
      className="flex flex-col items-center w-full min-h-screen bg-slate-900 p-4"
      ref={containerRef}
    >
      <div className="mb-4 flex gap-4">
        <Button onClick={dropBall} className="bg-rose-500 hover:bg-rose-600">
          Drop Ball
        </Button>
        <Button
          onClick={resetGame}
          variant="outline"
          className="text-white border-white hover:bg-gray-800"
        >
          Reset Game
        </Button>
      </div>

      <div className="mb-4 text-xl font-bold text-white">Score: {score}</div>

      {multipliers.length > 0 && (
        <div className="mb-4 text-sm flex flex-wrap flex-row gap-2 font-bold text-white">
          Recent Multipliers:{" "}
          {multipliers.slice(-5).map((multiplier, index) => (
            <div
              key={`${multiplier}-${index}`}
              className="px-2 py-1 bg-rose-500 rounded"
            >
              {multiplier}x
            </div>
          ))}
        </div>
      )}

      {/* <div className="relative w-full max-w-[760px]">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-gray-700 rounded-lg w-full"
        /> */}

      {/* Bucket point values */}
      {/* <div className="absolute bottom-0 left-0 right-0 flex">
          {MULTIPLIERS.map((multiplier, index) => (
            <div
              key={index}
              className="flex items-center h-8 justify-center text-white font-bold text-xs border-r border-gray-600 last:border-r-0"
              style={{
                backgroundColor: BUCKET_COLORS[index],
                width: `${100 / MULTIPLIERS.length}%`,
              }}
            >
              {multiplier}
            </div>
          ))}
        </div> */}
      {/* <BinsRow rowCount={ROWS} riskLevel={"MEDIUM"} binsWidth={canvasWidth} />
      </div> */}
      <div
        className="mx-auto flex h-full flex-col px-4 pb-4"
        style={{ maxWidth: `${BASE_WIDTH}px` }}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: `${BASE_WIDTH} / ${BASE_HEIGHT}` }}
        >
          <canvas
            ref={canvasRef}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
            className="h-full w-full"
          />
        </div>
        <BinsRow rowCount={ROWS} riskLevel={"MEDIUM"} binsWidth={bucketWidth} />
      </div>
    </div>
  );
}

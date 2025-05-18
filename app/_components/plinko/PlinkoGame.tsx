"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// We'll use Matter.js for physics
import Matter from "matter-js";
import { useMediaQuery } from "@/hooks/use-mobile";

export default function PlinkoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [score, setScore] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const MULTIPLIERS = [
    "10x",
    "3x",
    "1.6x",
    "1.4x",
    "1.1x",
    "1x",
    "0.5x",
    "1x",
    "1.1x",
    "1.4x",
    "1.6x",
    "3x",
    "10x",
  ];

  // Constants for the game
  const BASE_WIDTH = 550;
  const BASE_HEIGHT = 450;
  const [canvasWidth, setCanvasWidth] = useState(BASE_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(BASE_HEIGHT);
  const PEG_RADIUS = isMobile ? 3 : 4;
  const BALL_RADIUS = isMobile ? 5 : 6;
  const BUCKET_WIDTH = canvasWidth / MULTIPLIERS.length;
  const BUCKET_HEIGHT = 50;
  const ROWS = 15;
  const BALL_COLOR = "#f43f5e"; // Rose color for the ball
  const PEG_COLOR = "#ffffff"; // White color for pegs
  const BUCKET_COLORS = [
    "#ff023f", // Red - 10x
    "#ff402a", // Orange - 3x
    "#ff6b21", // Light orange - 1.6x
    "#ff8717", // Orange-yellow - 1.4x
    "#ffa009", // Gold - 1.1x
    "#ffc000", // Yellow - 1x
    "#ffdc00", // Light yellow - 0.5x
    "#ffc000", // Yellow - 1x
    "#ffa009", // Gold - 1.1x
    "#ff8717", // Orange-yellow - 1.4x
    "#ff6b21", // Light orange - 1.6x
    "#ff402a", // Orange - 3x
    "#ff023f", // Red - 10x
  ];

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const newWidth = Math.min(containerWidth, BASE_WIDTH);
      const newHeight = (newWidth / BASE_WIDTH) * BASE_HEIGHT;

      setCanvasWidth(newWidth);
      setCanvasHeight(newHeight);

      // Update the renderer if it exists
      if (renderRef.current) {
        renderRef.current.options.width = newWidth;
        renderRef.current.options.height = newHeight;
        renderRef.current.canvas.width = newWidth;
        renderRef.current.canvas.height = newHeight;
        Matter.Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
      }

      // Recreate the physics world with new dimensions
      if (engineRef.current && renderRef.current) {
        resetGame();
        setupPhysicsWorld();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Initialize the physics engine and renderer
  const setupPhysicsWorld = () => {
    if (!canvasRef.current) return;

    // Clear existing engine if it exists
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    // Create engine and renderer
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: "#1e293b", // Slate background
        pixelRatio: window.devicePixelRatio,
      },
    });

    engineRef.current = engine;
    renderRef.current = render;

    // Create the pegs in a triangle pattern
    // Calculate peg spacing based on canvas width
    const pegSpacing = canvasWidth / (ROWS + 1);

    // Create the pegs in a triangle pattern
    const pegs = [];
    const pegRows = ROWS - 2; // Adjust number of peg rows
    let lowestPegY = 5;

    for (let row = 0; row < pegRows; row++) {
      const pegCount = row + 3; // Start with at least 3 pegs in first row
      const rowWidth = (pegCount - 1) * pegSpacing;
      const startX = (canvasWidth - rowWidth) / 2;
      const y = canvasHeight * 0.15 + row * pegSpacing * 0.8; // Start pegs lower down

      lowestPegY = Math.max(lowestPegY, y); // Track the lowest peg position

      for (let i = 0; i < pegCount; i++) {
        const x = startX + i * pegSpacing;
        const peg = Matter.Bodies.circle(x, y, PEG_RADIUS, {
          isStatic: true,
          render: { fillStyle: PEG_COLOR },
          friction: 0.0001,
          restitution: 0.7,
        });
        pegs.push(peg);
      }
    }

    // Create bucket sensors - one for each multiplier
    const bucketSensors = [];
    const bucketY = canvasHeight - BUCKET_HEIGHT / 2;

    for (let i = 0; i < MULTIPLIERS.length; i++) {
      const x = i * BUCKET_WIDTH + BUCKET_WIDTH / 2;
      const sensor = Matter.Bodies.rectangle(
        x,
        bucketY,
        BUCKET_WIDTH - 2,
        BUCKET_HEIGHT - 5,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: BUCKET_COLORS[i],
            opacity: 0.3,
          },
          label: `bucket-${i}`,
        }
      );
      bucketSensors.push(sensor);
    }

    // Add walls to keep the ball in bounds
    const walls = [
      // Bottom
      Matter.Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 10, {
        isStatic: true,
        render: { fillStyle: "#475569" },
      }),
      // Left
      Matter.Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
        isStatic: true,
        render: { fillStyle: "#475569" },
      }),
      // Right
      Matter.Bodies.rectangle(canvasWidth, canvasHeight / 2, 10, canvasHeight, {
        isStatic: true,
        render: { fillStyle: "#475569" },
      }),
    ];

    // Add all bodies to the world
    Matter.Composite.add(engine.world, [...walls, ...pegs, ...bucketSensors]);

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
          (pair.bodyA.label.startsWith("bucket-") &&
            pair.bodyB.label === "ball") ||
          (pair.bodyB.label.startsWith("bucket-") &&
            pair.bodyA.label === "ball")
        ) {
          const bucketBody = pair.bodyA.label.startsWith("bucket-")
            ? pair.bodyA
            : pair.bodyB;
          const ballBody =
            pair.bodyA.label === "ball" ? pair.bodyA : pair.bodyB;

          const bucketIndex = Number.parseInt(bucketBody.label.split("-")[1]);

          // Get multiplier value
          const multiplierText = MULTIPLIERS[bucketIndex];
          const multiplier = Number.parseFloat(multiplierText.replace("x", ""));

          // Base points (adjust as needed)
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

    // Random position at the top with slight variation
    const x = canvasWidth / 2 + (Math.random() * 20 - 10);

    // Create a ball
    const ball = Matter.Bodies.circle(x, 40, BALL_RADIUS, {
      restitution: 0.5, // Bounciness
      friction: 0.001,
      density: 0.001,
      render: { fillStyle: BALL_COLOR },
      label: "ball",
    });

    // Add the ball to the world
    Matter.Composite.add(engineRef.current.world, [ball]);
  };

  // Function to reset the game
  const resetGame = () => {
    setScore(0);

    // Remove all balls
    if (engineRef.current) {
      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      const balls = bodies.filter((body) => body.label === "ball");
      Matter.Composite.remove(engineRef.current.world, balls);
    }
  };

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef}>
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

      <div className="relative w-full max-w-[550px]">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-gray-700 rounded-lg w-full"
        />

        {/* Bucket point values */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center w-full">
          <div className="flex justify-between px-8 mx-1 w-full">
            {MULTIPLIERS.map((multiplier, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-white font-bold text-[8px] sm:text-xs rounded"
                style={{
                  backgroundColor: BUCKET_COLORS[index],
                  width: `32px`,
                  height: isMobile ? "32px" : "32px",
                }}
              >
                {multiplier}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

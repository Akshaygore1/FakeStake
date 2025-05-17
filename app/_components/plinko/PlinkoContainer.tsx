"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// We'll use Matter.js for physics
import Matter from "matter-js";
import { useMobile } from "@/hooks/use-mobile";

export default function PlinkoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isMobile = useMobile();

  // Constants for the game
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 400,
  });
  const PEG_RADIUS = dimensions.width * 0.01; // Responsive peg size
  const BALL_RADIUS = dimensions.width * 0.015; // Responsive ball size
  const ROWS = 10;
  const BALL_COLOR = "#f43f5e"; // Rose color for the ball
  const PEG_COLOR = "#ffffff"; // White color for pegs
  // Enhanced bucket colors with gradient-like appearance
  const BUCKET_COLORS = [
    "#ff023f", // Red
    "#ff402a", // Orange
    "#ffc000", // Yellow
    "#ffa009", // Gold
    "#ffa009", // Gold
    "#ffa009", // Gold
    "#ffc000", // Yellow
    "#ff402a", // Orange
    "#ff023f", // Red
  ];

  // Function to calculate responsive dimensions
  const calculateDimensions = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const width = Math.min(containerWidth, 800); // Cap at 800px max
    const height = width * 1; // Maintain aspect ratio

    setDimensions({ width, height });
  };

  // Handle window resize
  useEffect(() => {
    calculateDimensions();

    const handleResize = () => {
      calculateDimensions();
      // Rebuild the game when dimensions change
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (engineRef.current) Matter.Engine.clear(engineRef.current);
        initializeGame();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize the physics engine and renderer
  const initializeGame = () => {
    if (!canvasRef.current || !containerRef.current) return;

    // Clear previous engine and renderer if they exist
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
    }
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
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: "#000",
      },
    });

    engineRef.current = engine;
    renderRef.current = render;

    // Calculate peg spacing based on canvas width
    const pegSpacing = dimensions.width / (ROWS + 1);

    // Create the pegs in a triangle pattern
    const pegs = [];
    const pegRows = ROWS - 2; // Adjust number of peg rows
    let lowestPegY = 0;

    for (let row = 0; row < pegRows; row++) {
      const pegCount = row + 3; // Start with at least 3 pegs in first row
      const rowWidth = (pegCount - 1) * pegSpacing;
      const startX = (dimensions.width - rowWidth) / 2;
      const y = dimensions.height * 0.15 + row * pegSpacing * 0.8; // Start pegs lower down

      lowestPegY = Math.max(lowestPegY, y); // Track the lowest peg position

      for (let i = 0; i < pegCount; i++) {
        const x = startX + i * pegSpacing;
        const peg = Matter.Bodies.circle(x, y, PEG_RADIUS, {
          isStatic: true,
          render: { fillStyle: PEG_COLOR },
          friction: 0.001,
          restitution: 0.5,
        });
        pegs.push(peg);
      }
    }

    // Calculate bucket dimensions and position
    const BUCKET_COUNT = 9;
    const BUCKET_WIDTH = dimensions.width / BUCKET_COUNT;
    const BUCKET_HEIGHT = dimensions.height * 0.04;
    const BUCKET_GAP = 0; // No gap between buckets

    // Position buckets right below the lowest peg with some spacing
    const bucketY = lowestPegY + pegSpacing * 1.5;

    // Add bucket sensors with improved styling
    const bucketSensors = [];
    for (let i = 0; i < BUCKET_COUNT; i++) {
      const x = i * BUCKET_WIDTH + BUCKET_WIDTH / 2;

      // Create bucket with enhanced styling
      const sensor = Matter.Bodies.rectangle(
        x,
        bucketY,
        BUCKET_WIDTH - BUCKET_GAP,
        BUCKET_HEIGHT,
        {
          isStatic: true,
          isSensor: true,
          render: {
            fillStyle: BUCKET_COLORS[i],
            lineWidth: 2,
            strokeStyle: "#ffffff",
          },
          chamfer: { radius: 5 }, // Rounded corners
          label: `bucket-${i}`,
        }
      );
      bucketSensors.push(sensor);
    }

    // Add walls to keep balls in the game area
    const wallThickness = 20;
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      dimensions.height / 2,
      wallThickness,
      dimensions.height,
      { isStatic: true, render: { visible: false } }
    );

    const rightWall = Matter.Bodies.rectangle(
      dimensions.width + wallThickness / 2,
      dimensions.height / 2,
      wallThickness,
      dimensions.height,
      { isStatic: true, render: { visible: false } }
    );

    // Add all bodies to the world
    Matter.Composite.add(engine.world, [
      ...pegs,
      ...bucketSensors,
      leftWall,
      rightWall,
    ]);

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
          const points = [10, 20, 30, 50, 100, 50, 30, 20, 10][bucketIndex];

          // Update score
          setScore((prevScore) => prevScore + points);

          // Remove the ball
          Matter.Composite.remove(engine.world, ballBody);
        }
      }
    });

    // Clean up balls that fall below the canvas
    Matter.Events.on(engine, "afterUpdate", () => {
      const bodies = Matter.Composite.allBodies(engine.world);
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (
          body.label === "ball" &&
          body.position.y > dimensions.height + 100
        ) {
          Matter.Composite.remove(engine.world, body);
        }
      }
    });
  };

  // Initialize game when component mounts or dimensions change
  useEffect(() => {
    initializeGame();

    // Cleanup
    return () => {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [dimensions]);

  // Function to drop a ball
  const dropBall = () => {
    if (!engineRef.current) return;

    setIsRunning(true);

    // Start from a random position near the center
    const randomOffset = Math.random() * 20 - 10; // Random offset between -10 and 10
    const x = dimensions.width / 2 + randomOffset;

    // Create a ball
    const ball = Matter.Bodies.circle(x, 20, BALL_RADIUS, {
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
    setIsRunning(false);

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

      <div className="relative w-full max-w-[800px]">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="border border-gray-700 rounded-lg w-full"
        />
      </div>
    </div>
  );
}

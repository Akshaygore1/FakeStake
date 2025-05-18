"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// We'll use Matter.js for physics
import Matter from "matter-js";
import { useMobile } from "@/hooks/use-mobile";

export default function PlinkoContainer() {
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
  const PEG_RADIUS = dimensions.width * 0.007; // Responsive peg size
  const BALL_RADIUS = dimensions.width * 0.009; // Responsive ball size
  const ROWS = 15;
  const BALL_COLOR = "#f43f5e"; // Rose color for the ball
  const PEG_COLOR = "#ffffff"; // White color for pegs

  // Define multipliers and colors to match the image
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
      gravity: { x: 0, y: 0.4 },
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
          friction: 0.0001,
          restitution: 0.7,
        });
        pegs.push(peg);
      }
    }

    // Calculate bucket dimensions and position
    const BUCKET_COUNT = MULTIPLIERS.length;
    const BUCKET_WIDTH = dimensions.width / BUCKET_COUNT;
    const BUCKET_HEIGHT = dimensions.height * 0.04;
    const BUCKET_GAP = 0; // No gap between buckets

    // Position buckets right below the lowest peg with some spacing
    const bucketY = lowestPegY + pegSpacing * 0.8;

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
          label: `bucket-${i}-${MULTIPLIERS[i]}`, // Add multiplier to label
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

          // Parse the bucket label to get the index and multiplier
          const bucketLabelParts = bucketBody.label.split("-");
          const bucketIndex = parseInt(bucketLabelParts[1]);
          const multiplier = bucketLabelParts[2];

          // Calculate points based on multiplier
          let points = 10; // Base points
          if (multiplier) {
            const multiplierValue = parseFloat(multiplier.replace("x", ""));
            points = Math.round(points * multiplierValue);
          }

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
    const randomOffset = 0; // Random offset between -10 and 10
    const x = dimensions.width / 2 + randomOffset;

    // Calculate y position based on container height (top 15% of the container)
    const y = dimensions.height * 0.1;

    // Create a ball
    const ball = Matter.Bodies.circle(x, y, BALL_RADIUS, {
      restitution: 0.5, // Bounciness
      friction: 0.002,
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

      {/* Multiplier Buckets - Visible representation matching the image */}
      <div className="flex justify-center w-full mt-2">
        {MULTIPLIERS.map((multiplier, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-white font-bold text-sm rounded"
            style={{
              backgroundColor: BUCKET_COLORS[index],
              width: `${100 / MULTIPLIERS.length}%`,
              height: "2rem",
            }}
          >
            {multiplier}
          </div>
        ))}
      </div>
    </div>
  );
}

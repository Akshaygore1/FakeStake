import React from "react";

const SEGMENTS = [
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#7e57c2",
  "#a0e75a",
  "#ffeb3b",
  "#3a556a",
  "#a0e75a",
  "#3a556a",
  "#ffeb3b",
  "#3a556a",
  "#ffc107",
  "#3a556a",
  "#e1f5fe",
];

const WheelComponent = ({ size = 500, radius = 190, strokeWidth = 20 }) => {
  const center = size / 2;
  const segmentAngle = 360 / SEGMENTS.length;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {SEGMENTS.map((color, index) => {
          const startAngle = index * segmentAngle;
          const endAngle = startAngle + segmentAngle;

          const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
          const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);

          const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle);
          const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle);

          return (
            <path
              key={index}
              d={`
          M ${center},${center}
          L ${x1},${y1}
          A ${radius},${radius} 0 0,1 ${x2},${y2}
          Z
        `}
              fill={color}
              stroke="none"
            />
          );
        })}

        {/* Inner circle for aesthetics */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth}
          fill="#0e1a24"
        />
      </svg>

      {/* Pin at top center */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 20,
          height: 20,
          backgroundColor: "#ec5f67",
          borderRadius: "50%",
          border: "5px solid #0e1a24",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
};

export default WheelComponent;

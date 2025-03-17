"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

interface CustomSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default function CustomSlider({
  min = 0,
  max = 100,
  defaultValue = 50,
  step = 1,
  onChange,
}: CustomSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));
    const newValue = Math.round((percentage * (max - min) + min) / step) * step;

    setValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative pt-6 pb-2">
        {/* Labels */}
        <div className="flex justify-between mb-2 text-gray-300 text-sm">
          <span>{min}</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>{max}</span>
        </div>

        {/* Slider track container */}
        <div
          ref={sliderRef}
          className="h-12 bg-gray-700/50 rounded-full cursor-pointer relative"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Track background */}
          <div className="absolute inset-0 justify-center items-center rounded-full overflow-hidden flex">
            {/* Red part (left side) */}
            <div
              className="h-2 bg-red-500"
              style={{ width: `${percentage}%` }}
            />
            {/* Green part (right side) */}
            <div className="h-2 bg-green-500 flex-grow" />
          </div>

          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center"
            style={{ left: `calc(${percentage}% - 20px)` }}
          >
            <div className="w-4 h-4 flex flex-col justify-between">
              <div className="w-full h-0.5 bg-blue-300"></div>
              <div className="w-full h-0.5 bg-blue-300"></div>
              <div className="w-full h-0.5 bg-blue-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

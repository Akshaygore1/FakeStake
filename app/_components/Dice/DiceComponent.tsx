"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const calculateDiceMultiplier = (value: number): number => {
  const maxValue = 100;
  if (value !== maxValue) {
    const multiplier = (100 / (100 - value)).toFixed(4);
    return Number(multiplier);
  } else {
    return Number((100 / value).toFixed(4));
  }
};

const calculateWinChance = (value: number): number => {
  return Number((100 - value).toFixed(4));
};

const dragAudio =
  typeof Audio !== "undefined"
    ? new Audio("/assets/audio/drag-audio.mp3")
    : null;

interface DiceComponentProps {
  multiplier: number;
  setMultiplier: (value: number) => void;
  targetNumber: number;
  gameStarted: boolean;
}

export default function DiceComponent({
  multiplier,
  setMultiplier,
  targetNumber,
  gameStarted,
}: DiceComponentProps) {
  const [value, setValue] = useState([50]);
  const [winChance, setWinChance] = useState(50);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    const currentValue = newValue[0];
    setMultiplier(calculateDiceMultiplier(currentValue));
    setWinChance(calculateWinChance(currentValue));
    if (dragAudio) {
      dragAudio.currentTime = 0;
      dragAudio.play();
    }
  };

  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex flex-col items-center justify-between">
      <div className="w-full h-24 flex justify-between items-center px-8 py-4 bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center w-28">
          <span className="text-gray-400 text-sm mb-2">Multiplier</span>
          <span className="text-white text-xl font-bold">{multiplier}X</span>
        </div>
        <div className="flex flex-col items-center w-28">
          <span className="text-gray-400 text-sm mb-2">Roll Over</span>
          <span className="text-white text-xl font-bold">{value[0]}</span>
        </div>
        <div className="flex flex-col items-center w-28">
          <span className="text-gray-400 text-sm mb-2">Win Chance</span>
          <span className="text-white text-xl font-bold">{winChance}%</span>
        </div>
      </div>
      <div className="w-full p-4 bg-gray-600 rounded-3xl">
        <div className="p-4 w-96 bg-gray-900 rounded-lg relative">
          {gameStarted && (
            <div
              className="absolute -top-10 flex flex-col items-center transition-all duration-300 ease-in-out"
              style={{
                left: `${targetNumber}%`,
                transform: `translateX(-50%)`,
              }}
            >
              <div className="hexagon-result flex items-center justify-center">
                <span
                  className={`${
                    targetNumber > value[0] ? "text-green-500" : "text-red-600"
                  } text-xl font-bold`}
                >
                  {targetNumber}
                </span>
              </div>
            </div>
          )}
          <Slider
            value={value}
            onValueChange={handleValueChange}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const calculateDiceMultiplier = (value: number): number => {
  const minValue = 2;
  const maxValue = 98;
  const multiplier = (100 / (100 - value)).toFixed(4);
  return Number(multiplier);
};

const calculateWinChance = (value: number): number => {
  return Number((100 - value).toFixed(4));
};

const dragAudio =
  typeof Audio !== "undefined"
    ? new Audio("/assets/audio/drag-audio.mp3")
    : null;

export default function DiceComponent() {
  const [value, setValue] = useState([50]);
  const [multiplier, setMultiplier] = useState(2.0);
  const [winChance, setWinChance] = useState(98.0);

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
      <div className="w-full flex justify-between items-center px-4 py-2 bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">Multiplier</span>
          <span className="text-white font-bold">{multiplier}X</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">Roll Over</span>
          <span className="text-white font-bold">{value[0]}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">Win Chance</span>
          <span className="text-white font-bold">{winChance}%</span>
        </div>
      </div>
      <div className="w-full p-4 bg-gray-600 rounded-3xl">
        <div className="p-4 w-96 bg-gray-900 rounded-lg">
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

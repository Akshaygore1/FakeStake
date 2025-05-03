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
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  winChance: number;
  setWinChance: React.Dispatch<React.SetStateAction<number>>;
  result: { isWin: boolean; randomNumber: number }[];
}

export default function DiceComponent({
  multiplier,
  setMultiplier,
  targetNumber,
  gameStarted,
  value,
  setValue,
  winChance,
  setWinChance,
  result,
}: DiceComponentProps) {
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
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-3 md:p-6 lg:p-8 flex flex-col items-center justify-between">
      <div className="w-full flex gap-4 flex-col">
        <div className="flex flex-row-reverse items-center w-full justify-end gap-2 overflow-x-auto no-scrollbar">
          {result
            .slice(-17)
            .map(
              (
                item: { isWin: boolean; randomNumber: number },
                index: number
              ) => (
                <div key={index} className="flex-shrink-0">
                  <div
                    className={`w-8 h-4 px-6  py-4 rounded-full flex items-center justify-center ${
                      item.isWin
                        ? "bg-success text-black"
                        : "bg-neutral-700 text-white"
                    }`}
                  >
                    <span className="text-xs font-bold">
                      {item.randomNumber}
                    </span>
                  </div>
                </div>
              )
            )}
        </div>
        <div className=" min-h-[120px] md:h-24 flex flex-row justify-between items-center text-center p-3 md:px-6 lg:px-8 py-4 bg-gray-800 rounded-lg gap-3 md:gap-4">
          <div className="flex flex-col items-center w-28 p-2">
            <span className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
              Multiplier
            </span>
            <span className="text-white text-lg md:text-xl font-bold">
              {multiplier}X
            </span>
          </div>
          <div className="flex flex-col items-center w-28 p-2">
            <span className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
              Roll Over
            </span>
            <span className="text-white text-lg md:text-xl font-bold">
              {value[0]}
            </span>
          </div>
          <div className="flex flex-col items-center w-28 p-2">
            <span className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
              Win Chance
            </span>
            <span className="text-white text-lg md:text-xl font-bold">
              {winChance}%
            </span>
          </div>
        </div>
      </div>
      <div className="w-full p-2 md:p-4 bg-gray-600 rounded-xl">
        <div className="p-2 md:p-4 w-full bg-gray-900 rounded-lg relative">
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

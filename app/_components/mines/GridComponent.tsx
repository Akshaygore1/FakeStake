/* eslint-disable @next/next/no-img-element */
"use client";

import { useConfigStore } from "@/app/_store/configStore";
import { useGridStore } from "@/app/_store/gridStore";
import { useEffect, useState } from "react";
import { Gem } from "lucide-react";
import { useCommonStore } from "@/app/_store/commonStore";
import { addGameResult } from "@/app/_constants/data";
import Modal from "../ui/Modal";

export default function GridComponent() {
  const {
    selectedGrid,
    handleSelectGrid,
    setSelectedGrid,
    numberOfSuccessfulClicks,
    setNumberOfSuccessfulClicks,
  } = useGridStore();
  const {
    numberOfMines,
    isGameSetup,
    setNumberOfMines,
    betAmount,
    resetGame,
    clearConfigStore,
  } = useConfigStore();
  const { balance } = useCommonStore();

  const [mines, setMines] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isGameSetup) {
      setSelectedGrid({});
      const generateUniqueMines = () => {
        const minePositions = new Set<number>();
        while (minePositions.size < numberOfMines) {
          minePositions.add(Math.floor(Math.random() * 25));
        }
        return Array.from(minePositions);
      };
      setMines(generateUniqueMines());
    }
  }, [numberOfMines, isGameSetup, setSelectedGrid]);

  const handleGridClick = (index: number) => {
    if (isGameSetup) {
      if (mines.includes(index)) {
        handleSelectGrid(index);
        const audio = new Audio("/assets/audio/mine-audio.mp3");
        audio.play();
        setShowModal(true);
        setNumberOfMines(1);
        setNumberOfSuccessfulClicks(0);
        clearConfigStore();
        resetGame();

        addGameResult(
          <div className="flex items-center justify-center gap-1">
            <Gem size={20} />
            Mines
          </div>,
          "Loss",
          -betAmount!,
          balance! < 100 ? (
            <div className="text-green-500">1000 (Restored)</div>
          ) : (
            balance!
          )
        );
      } else {
        if (!selectedGrid[index]) {
          handleSelectGrid(index);
          setNumberOfSuccessfulClicks(numberOfSuccessfulClicks + 1);
          const audio = new Audio("/assets/audio/win-audio.mp3");
          audio.play();
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3 w-full max-w-xl mx-auto">
      {Array.from({ length: 25 }).map((_, index) => (
        <div
          key={index}
          className={`aspect-square w-full min-h-18 flex justify-center items-center transition-all rounded-md duration-500 ${
            selectedGrid[index]
              ? mines.includes(index)
                ? "border-red-500 text-white animate-shake bg-[#071924] scale-95"
                : "border-green-500 text-white animate-pop bg-[#071924] scale-95"
              : "bg-[#2f4553] hover:scale-105 active:scale-95 active:bg-[#071924]"
          }`}
          onClick={() => handleGridClick(index)}
        >
          {/* Conditional rendering of icons */}
          {(selectedGrid[index] || showModal) && (
            <>
              {mines.includes(index) ? (
                <div className="relative flex p-2 items-center justify-center w-full h-full bg-primary text-white font-bold rounded-md">
                  <img
                    src="/assets/mine.svg"
                    alt="bomb"
                    className="w-4/5 h-4/5 animate-fade-in"
                  />
                </div>
              ) : (
                <div className="relative flex p-2 items-center justify-center w-full h-full bg-primary text-white font-bold rounded-md">
                  <img
                    src="/assets/diamond.svg"
                    alt="coins"
                    className="w-4/5 h-4/5 animate-fade-in"
                  />
                </div>
              )}
            </>
          )}
        </div>
      ))}
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        result="lose"
        amount={100}
      />
    </div>
  );
}

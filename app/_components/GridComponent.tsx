/* eslint-disable @next/next/no-img-element */
"use client";

import { useConfigStore } from "@/app/_store/configStore";
import { useGridStore } from "@/app/_store/gridStore";
import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import { Bomb, Gem } from "lucide-react";
import { useCommonStore } from "@/app/_store/commonStore";
import { addGameResult } from "@/app/_constants/data";

export default function GridComponent() {
  const {
    selectedGrid,
    handleSelectGrid,
    setSelectedGrid,
    numberOfSuccessfulClicks,
    setNumberOfSuccessfulClicks,
    resetGrid,
  } = useGridStore();
  const {
    numberOfMines,
    isGameSetup,
    setIsGameSetup,
    setNumberOfMines,
    betAmount,
    setBetAmount,
    resetGame,
    clearConfigStore,
  } = useConfigStore();
  const { multiplier, setMultiplier, clearCommonState, balance, setBalance } =
    useCommonStore();

  const [mines, setMines] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  console.log("MINES: ", mines);

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
        setShowModal(true);
        setNumberOfMines(1);
        setNumberOfSuccessfulClicks(0);
        clearCommonState();
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
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2">
      {Array.from({ length: 25 }).map((_, index) => (
        <div
          key={index}
          className={`h-16 w-16 sm:h-16 sm:w-16 md:h-22 md:w-22 lg:h-28 lg:w-28 flex justify-center items-center  transition-transform rounded-md duration-200 ${
            selectedGrid[index]
              ? mines.includes(index)
                ? "border-red-500 text-white animate-shake"
                : "border-green-500 text-white animate-pop"
              : " bg-[#2f4553] hover:scale-105"
          }`}
          onClick={() => handleGridClick(index)}
        >
          {/* Conditional rendering of icons */}
          {(selectedGrid[index] || showModal) && (
            <>
              {mines.includes(index) ? (
                <img src="/assets/mine.svg" alt="bomb" className="w-16 h-16" />
              ) : (
                <div className="relative flex items-center justify-center w-full h-full text-2xl text-white font-bold">
                  <img
                    src="/assets/diamond.svg"
                    alt="coins"
                    className="w-16 h-16"
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

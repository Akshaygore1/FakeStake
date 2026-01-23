/* eslint-disable @next/next/no-img-element */
"use client";

import { useConfigStore } from "@/stores/config.store";
import { useGridStore } from "@/stores/game/grid.store";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { IconDiamond } from "@tabler/icons-react";
import { useCommonStore } from "@/stores/common.store";
import { useHistoryStore } from "@/stores/history.store";
import Modal from "@/app/_components/ui/Modal";
import { url } from "@/lib/utils";
import { useAudio } from "@/hooks/use-audio";

export default function GridComponent() {
  // Use individual selectors instead of destructuring entire store
  const selectedGrid = useGridStore((state) => state.selectedGrid);
  const handleSelectGrid = useGridStore((state) => state.handleSelectGrid);
  const setSelectedGrid = useGridStore((state) => state.setSelectedGrid);
  const numberOfSuccessfulClicks = useGridStore((state) => state.numberOfSuccessfulClicks);
  const setNumberOfSuccessfulClicks = useGridStore((state) => state.setNumberOfSuccessfulClicks);

  const numberOfMines = useConfigStore((state) => state.numberOfMines);
  const isGameSetup = useConfigStore((state) => state.isGameSetup);
  const betAmount = useConfigStore((state) => state.betAmount);
  const resetGame = useConfigStore((state) => state.resetGame);
  const clearConfigStore = useConfigStore((state) => state.clearConfigStore);

  const balance = useCommonStore((state) => state.balance);
  const setBalance = useCommonStore((state) => state.setBalance);

  const addGameResult = useHistoryStore((state) => state.addGameResult);

  // Preload audio files
  const audioUrls = useMemo(() => [
    `${url}/mine-audio.mp3`,
    `${url}/win-audio.mp3`
  ], []);
  const { play } = useAudio(audioUrls);

  const [mines, setMines] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Use refs for values that change frequently but are only needed in callbacks
  const balanceRef = useRef(balance);
  const selectedGridRef = useRef(selectedGrid);
  const numberOfSuccessfulClicksRef = useRef(numberOfSuccessfulClicks);
  const betAmountRef = useRef(betAmount);

  // Keep refs in sync
  useEffect(() => { balanceRef.current = balance; }, [balance]);
  useEffect(() => { selectedGridRef.current = selectedGrid; }, [selectedGrid]);
  useEffect(() => { numberOfSuccessfulClicksRef.current = numberOfSuccessfulClicks; }, [numberOfSuccessfulClicks]);
  useEffect(() => { betAmountRef.current = betAmount; }, [betAmount]);

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

  const handleGridClick = useCallback((index: number) => {
    if (!isGameSetup) return;

    if (mines.includes(index)) {
      handleSelectGrid(index);
      play(`${url}/mine-audio.mp3`);
      setShowModal(true);
      setNumberOfSuccessfulClicks(0);
      clearConfigStore();
      resetGame();

      // Use ref values for frequently changing state
      const currentBalance = balanceRef.current ?? 0;
      if (currentBalance < 100) {
        setBalance(1000);
      }

      addGameResult(
        <div className="flex items-center justify-center gap-1">
          <IconDiamond size={20} />
          Mines
        </div>,
        "Loss",
        -(betAmountRef.current ?? 0),
        currentBalance < 100 ? (
          <div className="text-green-500">1000 (Restored)</div>
        ) : (
          currentBalance
        )
      );
    } else {
      if (!selectedGridRef.current[index]) {
        handleSelectGrid(index);
        setNumberOfSuccessfulClicks(numberOfSuccessfulClicksRef.current + 1);
        play(`${url}/win-audio.mp3`);
      }
    }
  }, [
    isGameSetup,
    mines,
    handleSelectGrid,
    play,
    setNumberOfSuccessfulClicks,
    clearConfigStore,
    resetGame,
    setBalance,
    addGameResult,
  ]);

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
                    src={`${url}/mine.svg`}
                    alt="bomb"
                    className="w-4/5 h-4/5 animate-fade-in"
                  />
                </div>
              ) : (
                <div className="relative flex p-2 items-center justify-center w-full h-full bg-primary text-white font-bold rounded-md">
                  <img
                    src={`${url}/diamond.svg`}
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

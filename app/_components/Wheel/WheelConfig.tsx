"use client";
import { useCommonStore } from "@/app/_store/commonStore";
import { Coins } from "lucide-react";
import { useState } from "react";

export default function WheelConfig() {
  const { balance } = useCommonStore();
  const [betAmount, setBetAmount] = useState(0);
  // const handleBetAmountChange = (value: string) => {
  //   setBetAmount(value);
  // };

  return (
    <div className="flex flex-col gap-6 p-4 text-white max-w-md mx-auto rounded-lg">
      {/* Bet Amount */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-[#b0b9d2]">Bet Amount</span>
          <span className="text-white">
            ${balance ? balance.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="flex bg-[#1e2a36] rounded-md overflow-hidden">
          <div className="flex-1 flex items-center relative">
            <input
              type="number"
              id="betAmount"
              value={betAmount !== null ? betAmount : ""}
              min={10}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full bg-[#1e2a36] px-3 py-3 outline-none"
              // disabled={gameStarted}
              onClick={(e) => e.currentTarget.select()}
            />
            <div className="absolute right-3 pointer-events-none">
              <Coins className="w-4 h-4 text-success" />
            </div>
          </div>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount / 2)
            }
            // disabled={gameStarted}
          >
            ½
          </button>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors"
            onClick={() =>
              betAmount && betAmount > 0 && setBetAmount(betAmount * 2)
            }
            // disabled={gameStarted}
          >
            2×
          </button>
        </div>
        {betAmount! > balance && (
          <p className="mt-1 text-sm font-medium text-red-500">
            Insufficient balance!
          </p>
        )}
      </div>
    </div>
  );
}

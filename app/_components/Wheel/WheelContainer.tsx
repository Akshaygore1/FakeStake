"use client"

import { useState } from "react"
import { ChevronDown, Bitcoin } from "lucide-react"
import { cn } from "@/lib/utils"
import WheelComponent from "./WheelComponent"

export default function WheelContainer() {
  const [mode, setMode] = useState<"manual" | "auto">("manual")
  const [betAmount, setBetAmount] = useState("0.00000000")
  const [risk, setRisk] = useState("Low")
  const [segments, setSegments] = useState("20")
  const [multiplier, setMultiplier] = useState("1.50x")

  return (
    <div className="flex flex-col md:flex-row w-full bg-[#0f1923] text-white">
      {/* Config Panel */}
      <div className="w-full md:w-[380px] p-6 bg-[#1a2530] border-r border-gray-800">

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Bet Amount</span>
            <span>$0.00</span>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 bg-[#1e2a36] rounded-l-md flex items-center">
              <input
                type="text"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
              <div className="px-3">
                <Bitcoin className="h-5 w-5 text-[#f7931a]" />
              </div>
            </div>
            <button className="bg-[#1e2a36] px-4 border-l border-gray-700">½</button>
            <button className="bg-[#1e2a36] px-4 rounded-r-md border-l border-gray-700">2×</button>
          </div>
        </div>

        {/* Risk */}
        <div className="mb-6">
          <div className="mb-2">
            <span className="text-gray-400">Risk</span>
          </div>
          <div className="relative">
            <button className="w-full bg-[#1e2a36] rounded-md px-3 py-3 flex justify-between items-center">
              <span>{risk}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Segments */}
        <div className="mb-6">
          <div className="mb-2">
            <span className="text-gray-400">Segments</span>
          </div>
          <div className="relative">
            <button className="w-full bg-[#1e2a36] rounded-md px-3 py-3 flex justify-between items-center">
              <span>{segments}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bet Button */}
        <button className="w-full bg-[#5cdb5c] hover:bg-[#4bc74b] text-black font-medium py-4 rounded-md transition-colors">
          Bet
        </button>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="relative">
            <WheelComponent />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-8 bg-[#e74c3c] rounded-t-full"></div>
            </div>
          </div>
        </div>

        {/* Multipliers */}
        <div className="grid grid-cols-3 gap-2 p-4">
          <button
            onClick={() => setMultiplier("0.00x")}
            className={cn(
              "py-4 rounded-md text-center transition-colors",
              multiplier === "0.00x" ? "bg-[#2c3e50] border-t-2 border-[#3498db]" : "bg-[#2c3e50]/50",
            )}
          >
            0.00×
          </button>
          <button
            onClick={() => setMultiplier("1.20x")}
            className={cn(
              "py-4 rounded-md text-center transition-colors",
              multiplier === "1.20x" ? "bg-[#2c3e50] border-t-2 border-[#3498db]" : "bg-[#2c3e50]/50",
            )}
          >
            1.20×
          </button>
          <button
            onClick={() => setMultiplier("1.50x")}
            className={cn(
              "py-4 rounded-md text-center transition-colors",
              multiplier === "1.50x" ? "bg-[#2c3e50] border-t-2 border-[#5cdb5c]" : "bg-[#2c3e50]/50",
            )}
          >
            1.50×
          </button>
        </div>
      </div>
    </div>
  )
}
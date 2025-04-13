"use client";
import { useState } from "react";

export default function WheelConfig() {
    const [inputValue, setInputValue] = useState("");
  const handleBetAmountChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="text-white bg-slate-900 p-4 md:p-6 rounded-md w-full">
    <label htmlFor="betAmount" className="block mb-2 text-sm font-medium">
      Bet Amount
    </label>
    <input
      type="number"
      id="betAmount"
      value={inputValue}
      className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:border-none focus:outline-none"
      onChange={(e) => handleBetAmountChange(e.target.value)}
    />
    </div>
  )
}
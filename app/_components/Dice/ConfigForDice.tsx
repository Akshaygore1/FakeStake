import { useCommonStore } from "@/app/_store/commonStore";
import React from "react";

function ConfigForDice({ onBet }: { onBet: (amount: number) => void }) {
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const { balance } = useCommonStore();

  const handleBetAmountChange = (newValue: string) => {
    setInputValue(newValue);
    const parsedValue = parseInt(newValue);
    if (!isNaN(parsedValue)) {
      setBetAmount(parsedValue);
      if (parsedValue > balance) {
        setError("Bet amount cannot exceed your balance");
      } else {
        setError("");
      }
    }
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={() => onBet(betAmount)}
        className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
        disabled={!betAmount || betAmount > balance}
      >
        Bet
      </button>
    </div>
  );
}

export default ConfigForDice;

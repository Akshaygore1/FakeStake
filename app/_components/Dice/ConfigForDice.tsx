import React from "react";

function ConfigForDice({ onBet }: { onBet: (amount: number) => void }) {
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [inputValue, setInputValue] = React.useState<string>("");

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
        onChange={(e) => {
          const newValue = e.target.value;
          setInputValue(newValue);
          const parsedValue = parseInt(newValue);
          if (!isNaN(parsedValue)) {
            setBetAmount(parsedValue);
          }
        }}
      />
      <button
        onClick={() => onBet(betAmount)}
        className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
        disabled={!betAmount}
      >
        Bet
      </button>
    </div>
  );
}

export default ConfigForDice;

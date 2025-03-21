import React from "react";

function ConfigForDice({
  setBetAmount,
  onBet,
}: {
  setBetAmount: React.Dispatch<React.SetStateAction<number | null>>;
  onBet: () => void;
}) {
  return (
    <div className="text-white bg-slate-900 p-4 rounded-md">
      <label htmlFor="betAmount" className="block mb-2 text-sm font-medium">
        Bet Amount
      </label>
      <input
        type="number"
        id="betAmount"
        className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:border-none focus:outline-none"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            setBetAmount(value);
          }
        }}
      />
      <button
        onClick={onBet}
        className="w-full p-2 mt-4 border border-gray-600 rounded-lg bg-green-500 text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
      >
        Bet
      </button>
    </div>
  );
}

export default ConfigForDice;

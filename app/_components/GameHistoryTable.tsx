import { gameHistory } from "../_constants/data";

function GameHistoryTable() {
  return (
    <section className="flex flex-col text-center mt-28 mb-24 w-[80%] lg:w-[50%] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Game History</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-opacity-50 bg-[#080b0999] backdrop-blur-[2px]">
          <thead className="bg-transparent">
            <tr>
              <th className="px-4 py-2 border border-gray-300 rounded-tl-lg">
                Game
              </th>
              <th className="px-4 py-2 border border-gray-300">Result</th>
              <th className="px-4 py-2 border border-gray-300">Profit</th>
              <th className="px-4 py-2 border border-gray-300 rounded-tr-lg">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((entry, index) => (
              <tr key={index} className="text-center bg-transparent ">
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    entry.result === "Win" ? `text-green-500` : `text-red-500`
                  }`}
                >
                  {entry.gameName}
                </td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    entry.result === "Win" ? `text-green-500` : `text-red-500`
                  }`}
                >
                  {entry.result}
                </td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    entry.result === "Win" ? `text-green-500` : `text-red-500`
                  }`}
                >
                  {entry.amount}
                </td>
                <td
                  className={`px-4 py-2 border border-gray-300 ${
                    entry.result === "Win" ? `text-green-500` : `text-red-500`
                  }`}
                >
                  {typeof entry.finalBalance !== "number"
                    ? entry.finalBalance
                    : entry.finalBalance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GameHistoryTable;

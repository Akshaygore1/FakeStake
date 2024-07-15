import { useLocalStorage } from "../_hooks/useLocalStorage";

let gameHistory;
const { setItem, getItem } = useLocalStorage("game-history");

export const addGameResult = (gameName, result, amount, finalBalance) => {
  gameHistory = getItem();

  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Amount isn't a valid number");
  }

  if (gameHistory.length >= 5) {
    gameHistory.shift();
  }

  const formattedAmount = amount.toFixed(2);
  gameHistory.push({
    gameName,
    result,
    amount: formattedAmount,
    finalBalance,
  });

  setItem(gameHistory);
};

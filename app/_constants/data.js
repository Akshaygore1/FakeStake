export const addGameResult = (gameName, result, amount, finalBalance) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Amount isn't a valid number");
  }

  if (gameHistory.length >= 5) {
    gameHistory.shift();
  }

  const formattedAmount = amount.toFixed(2)
  gameHistory.push({
    gameName,
    result,
    amount: formattedAmount,
    finalBalance,
  });
};

export const gameHistory = [];

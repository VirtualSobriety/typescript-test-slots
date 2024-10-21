import React from "react";

export function BetButtons({
  increaseBetAmount,
  decreaseBetAmount,
  gameOver,
  getRandomSymbol,
  betAmount,
  isSpinning,
}: {
  increaseBetAmount: () => void;
  decreaseBetAmount: () => void;
  gameOver: boolean;
  getRandomSymbol: () => void;
  betAmount: number;
  isSpinning: boolean;
}) {
  return (
    <div className="bet-button-container">
      {" "}
      {!gameOver && (
        <div className="bet-increment-buttons">
          {!gameOver && (
            <button
              className="bet-increase-button"
              onClick={increaseBetAmount}
              disabled={isSpinning}
            >
              Raise your bet?
            </button>
          )}
          {!gameOver && (
            <button
              className="bet-decrease-button"
              onClick={decreaseBetAmount}
              disabled={isSpinning}
            >
              Lower your bet?
            </button>
          )}
        </div>
      )}
      {!gameOver && (
        <button
          className="bet-amount-button"
          onClick={getRandomSymbol}
          disabled={isSpinning}
        >
          spin at {betAmount} chip{betAmount > 1 ? "s" : ""} per line?
        </button>
      )}
    </div>
  );
}

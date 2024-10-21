import React, { useEffect, useState } from "react";
import { symbols, symbolValues } from "../symbols";
import { BetButtons } from "./Betbuttons";

export default function Symbols() {
  const [randomSymbol1, setRandomSymbol1] = useState<number>(0);
  const [randomSymbol2, setRandomSymbol2] = useState<number>(0);
  const [randomSymbol3, setRandomSymbol3] = useState<number>(0);
  const [randomSymbol4, setRandomSymbol4] = useState<number>(0);
  const [randomSymbol5, setRandomSymbol5] = useState<number>(0);
  const [initialSpin, setInitialSpin] = useState<boolean>(false);
  const [allFiveMatch, setAllFiveMatch] = useState<boolean>(false);
  const [fourMatch, setFourMatch] = useState<boolean>(false);
  const [threeMatch, setThreeMatch] = useState<boolean>(false);
  const [playerChips, setPlayerChips] = useState<number>(50);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [chipsWon, setChipsWon] = useState<number>(0);
  const [betAmount, setBetAmount] = useState<number>(1);

  const getRandomSymbol = () => {
    if (playerChips < betAmount) {
      alert("You don't have enough chips for that!");
      return;
    }
    setRandomSymbol1(Math.floor(Math.random() * symbols.length));
    setRandomSymbol2(Math.floor(Math.random() * symbols.length));
    setRandomSymbol3(Math.floor(Math.random() * symbols.length));
    setRandomSymbol4(Math.floor(Math.random() * symbols.length));
    setRandomSymbol5(Math.floor(Math.random() * symbols.length));
    setInitialSpin(true);
    setAllFiveMatch(false);
    setFourMatch(false);
    setThreeMatch(false);
    setChipsWon(0);
  };

  const finalLine: string[] = [
    symbols[randomSymbol1],
    symbols[randomSymbol2],
    symbols[randomSymbol3],
    symbols[randomSymbol4],
    symbols[randomSymbol5],
  ];

  useEffect(() => {
    if (!initialSpin) return;
    const allMatching = finalLine.every((symbol) => symbol === finalLine[0]);
    const fourMatching = finalLine
      .slice(0, 4)
      .every((symbol) => symbol === finalLine[0]);
    const threeMatching = finalLine
      .slice(0, 3)
      .every((symbol) => symbol === finalLine[0]);

    const symbolValue = symbolValues[finalLine[0]];
    let chipsWonAmount: number = 0;

    if (allMatching && initialSpin) {
      chipsWonAmount = symbolValue * betAmount * 1.5;
      setAllFiveMatch(true);
    } else if (fourMatching && initialSpin) {
      chipsWonAmount = symbolValue * betAmount * 1;
      setFourMatch(true);
    } else if (threeMatching && initialSpin) {
      chipsWonAmount = symbolValue * betAmount * 0.5;
      setThreeMatch(true);
    }

    setPlayerChips((prevChips) => {
      const updatedChips: number = prevChips + chipsWonAmount - betAmount;
      if (updatedChips <= 0 && chipsWonAmount === 0) {
        setGameOver(true);
      }
      return updatedChips;
    });
    setChipsWon(chipsWonAmount);
  }, [
    randomSymbol1,
    randomSymbol2,
    randomSymbol3,
    randomSymbol4,
    randomSymbol5,
  ]);

  const increaseBetAmount = () => {
    setBetAmount((betAmount) => betAmount + 1);
  };
  const decreaseBetAmount = () => {
    setBetAmount((betAmount) => Math.max(betAmount - 1, 1));
  };

  return (
    <div>
      <div className="slots-main-container">
        <h1>SLOTS!!!</h1>
        <h2 className="slot-symbols">
          {initialSpin
            ? finalLine.map((symbol, index) => (
                <span key={index} className="symbol">
                  {symbol}
                </span>
              ))
            : Array(5)
                .fill(symbols[0])
                .map((symbol, index) => (
                  <span key={index} className="symbol">
                    {symbol}
                  </span>
                ))}
        </h2>
        {gameOver && <h1>YOU'RE FREAKIN BROKE!!!</h1>}
        <BetButtons
          gameOver={gameOver}
          increaseBetAmount={increaseBetAmount}
          decreaseBetAmount={decreaseBetAmount}
          getRandomSymbol={getRandomSymbol}
          betAmount={betAmount}
        />
      </div>
      <div className="words-and-chips-container">
        {initialSpin && allFiveMatch && (
          <h2>YOU FREAKIN DID IT!!! THAT'S {chipsWon} CHIPS!!!</h2>
        )}
        {initialSpin && fourMatch && (
          <div>
            Alright cool you got 4 in a row.{" "}
            <h3>That earned you {chipsWon} chips!</h3>
          </div>
        )}
        {initialSpin && threeMatch && (
          <div>
            cool...3 in a row is something...
            <h3>you won: {chipsWon} chips!</h3>
          </div>
        )}
        <div>chips: {playerChips}</div>
      </div>
    </div>
  );
}

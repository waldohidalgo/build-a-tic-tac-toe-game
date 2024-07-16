"use client";
import { useState, useEffect } from "react";
import BestPlay from "../utils/bestPlay";
import Selector from "./Selector";
const bestPlayFinder = new BestPlay();

export default function Tablero() {
  const [tablero, setTablero] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState(null);
  const [turnSelected, setTurnSelected] = useState(null);
  const [win, setWin] = useState(null);
  const [combinacionGanadora, setCombinacionGanadora] = useState([]);

  useEffect(() => {
    const turnoOpuesto = turnSelected === "X" ? "O" : "X";
    if (turn === turnoOpuesto && win === null) {
      async function getBestMove() {
        try {
          const [iPosition, jPosition] =
            await bestPlayFinder.getBestMoveTimeSpacing(tablero, turn, 500);
          const newTablero = [...tablero];
          newTablero[iPosition][jPosition] = turn;
          setTablero(newTablero);
          const winner = bestPlayFinder.checkWinner(newTablero);
          if (winner) {
            setWin(winner);
            setCombinacionGanadora(
              bestPlayFinder.getCoordinatesWinner(newTablero)
            );
            return;
          }
          setTurn(turn === "X" ? "O" : "X");
        } catch (error) {
          console.log(error);
        }
      }

      getBestMove();
    }
  }, [turn, tablero, win, turnSelected]);

  function handleClick(i, j) {
    if (turn === turnSelected && tablero[i][j] === "" && win === null) {
      const newTablero = [...tablero];
      newTablero[i][j] = turn;
      setTablero(newTablero);
      const winner = bestPlayFinder.checkWinner(newTablero);
      if (winner) {
        setWin(winner);
        setCombinacionGanadora(bestPlayFinder.getCoordinatesWinner(newTablero));
        return;
      }
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  if (win !== null) {
    setTimeout(() => {
      setTablero([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      setWin(null);
      setTurn(turnSelected);
      setCombinacionGanadora([]);
    }, 1000);
  }

  function handleReset() {
    setTablero([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWin(null);
    setTurn(null);
    setCombinacionGanadora([]);
  }
  return (
    <>
      {turn === "X" || turn === "O" ? (
        <div className="py-5 overflow-auto">
          <h2 className="text-center font-bold text-lg">
            You have chosen to play with: {turnSelected}
          </h2>
          <div className="flex flex-wrap justify-between w-[300px] mx-auto mt-5">
            <div className="w-[150px] border border-black flex flex-col items-center justify-center">
              <p className="text-center font-bold">
                Turn to: {win ? "-" : turn === "X" ? "X" : "O"}
              </p>
              {win && (
                <p className="text-center">
                  Winner: {win === "draw" ? "Draw!" : win}
                </p>
              )}
            </div>
            <button
              className="inline-block  p-2 rounded-2xl bg-white border border-black shadow-[2px_3px_0px_0px_black] hover:bg-blue-500 hover:text-white"
              onClick={handleReset}
            >
              Reset Game
            </button>
          </div>

          <div className="mt-5 w-fit mx-auto shadow-[6px_8px_0px_0px_black]">
            {tablero.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 w-[300px] mx-auto bg-white "
              >
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`w-[100px] aspect-square border-cell cursor-pointer flex justify-center items-center text-[40px] font-bold ${
                      combinacionGanadora.length > 0
                        ? combinacionGanadora
                            .map((e) => e.join(","))
                            .includes(i + "," + j)
                          ? "bg-green-500"
                          : ""
                        : ""
                    }`}
                    onClick={() => handleClick(i, j)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Selector setTurn={setTurn} setTurnSelected={setTurnSelected} />
      )}
    </>
  );
}

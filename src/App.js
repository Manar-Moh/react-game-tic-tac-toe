import { useState } from "react";
import GameBoard from "./components/game-board/gameboard.jsx";
import { Log } from "./components/log.jsx";
import PlayersList from "./components/players/players-list-component.jsx";
import { WINNING_COMBINATIONS } from "./winning_compinations";
import { GameOver } from "./components/game-over.jsx";

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function getActivePlayer(prevTurns) {
  let current = "X";
  if (prevTurns.length > 0 && prevTurns[0].player === "X") current = "O";
  return current;
}

function deriveWinner(gameboard) {
  for (const compination of WINNING_COMBINATIONS) {
    const first = gameboard[compination[0].row][compination[0].column];
    const second = gameboard[compination[1].row][compination[1].column];
    const third = gameboard[compination[2].row][compination[2].column];

    if (first && first === second && first === third) return first;
    if (second && second === first && second === third) return second;
    if (third && third === first && third === second) return third;
  }
}

function deriveGameBoard(gameTurn) {
  let gameboard = [...INIT_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurn) {
    const { player, square } = turn;
    const { row, column } = square;
    gameboard[row][column] = player;
  }
  return gameboard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = getActivePlayer(gameTurn);
  const gameboard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameboard);
  const hasDraw = !winner && gameTurn.length == 9;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {
      const current = getActivePlayer(prevTurns);
      return [
        { player: current, square: { row: rowIndex, column: colIndex } },
        ...prevTurns,
      ];
    });
  }

  function handleSetPlayerName(symbol, name) {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: name,
      };
    });
  }

  function restartGame() {
    setGameTurn([]);
    gameboard = initalGameBoard;
  }

  return (
    <>
      <div id="game-container">
        <PlayersList
          players={players}
          activePlayer={activePlayer}
          setPlayers={handleSetPlayerName}
        />
        {(winner || hasDraw) && (
          <GameOver winner={players[winner]} restartGame={restartGame} />
        )}
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameboard={gameboard}
        />
      </div>
      <Log gameTurn={gameTurn} />
    </>
  );
}

export default App;

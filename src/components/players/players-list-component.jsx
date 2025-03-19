import PlayerItem from "./player-item-component.jsx";

export default function PlayersList({ activePlayer, setPlayers, players }) {
  return (
    <ol id="players" className="highlight-player">
      <PlayerItem
        name={players.X}
        symbol="X"
        active={activePlayer === "X"}
        setPlayers={setPlayers}
      />
      <PlayerItem
        name={players.O}
        symbol="O"
        active={activePlayer === "O"}
        setPlayers={setPlayers}
      />
    </ol>
  );
}

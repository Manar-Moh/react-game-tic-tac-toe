import { useState } from "react";
export default function PlayerItem({ name, symbol, active, setPlayers }) {
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  let playerNamePlace = <span className="player-name">{playerName}</span>;

  function handleEditClick() {
    setIsEdit(() => !isEdit);
  }

  function handleChangePlayer(event) {
    setPlayerName(event.target.value);
    setPlayers(symbol, event.target.value);
  }

  if (isEdit) {
    playerNamePlace = (
      <input type="text" value={playerName} onChange={handleChangePlayer} />
    );
  }

  return (
    <li className={active ? "active" : ""}>
      <span className="player">
        {playerNamePlace}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEdit ? "Save" : "Edit"}</button>
    </li>
  );
}

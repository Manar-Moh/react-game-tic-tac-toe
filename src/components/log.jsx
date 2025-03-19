export function Log({ gameTurn }) {
  return (
    <ol id="log">
      {gameTurn.map((turn, index) => (
        <li key={index}>
          {turn.player} selected {turn.square.row},{turn.square.column}
        </li>
      ))}
    </ol>
  );
}

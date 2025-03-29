export default function History({ history }) {
    return (
      <div>
        <h3>Betting History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              Bet Type: {entry.betType}, Bet: {entry.betNum || entry.betType}, Amount: ₹{entry.betAmt}, Winning Number: {entry.winNum}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
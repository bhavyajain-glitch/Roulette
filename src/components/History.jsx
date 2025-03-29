import "../styles/History.css";

export default function History({ history }) {
  return (
    <div className="history-container">
      <h3 className="history-title">Betting History</h3>
      <ul className="history-list">
        {history.length === 0 ? (
          <li className="history-item neutral">No bets placed yet</li>
        ) : (
          history.map((entry, index) => (
            <li
              key={index}
              className={`history-item ${entry.winNum === entry.betNum ? "win" : "lose"}`}
            >
              Bet Type: {entry.betType}, Bet: {entry.betNum || entry.betType}, 
              Amount: ₹{entry.betAmt}, Winning Number: {entry.winNum}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

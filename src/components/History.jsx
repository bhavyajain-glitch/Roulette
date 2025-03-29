import { useState } from "react";
import "../styles/History.css";

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const GREEN_NUMBER = 0;

export default function History({ history }) {
  const [expanded, setExpanded] = useState(false);
  const displayedHistory = expanded ? history : history.slice(0, 5);

  const getResultIcon = (entry) => {
    if (entry.betType === "number" && entry.winNum === entry.betNum) return "💰";
    if (entry.betType === "red" && RED_NUMBERS.includes(entry.winNum)) return "💰";
    if (entry.betType === "black" && BLACK_NUMBERS.includes(entry.winNum)) return "💰";
    if (entry.betType === "green" && entry.winNum === GREEN_NUMBER) return "💰";
    return "❌";
  };

  const getBetColor = (entry) => {
    if (entry.betType === "red") return "#FF3131";
    if (entry.betType === "black") return "#222";
    if (entry.betType === "green") return "#0F9D58";
    return "#4a90e2"; 
  };

  const formatBetType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="history-container">
      <div className="history-header" onClick={() => setExpanded(!expanded)}>
        <h3 className="history-title">Betting History</h3>
        <span className="history-count">{history.length}</span>
        <span className="history-toggle">
          {expanded ? '▲' : '▼'}
        </span>
      </div>
      
      <ul className="history-list">
        {history.length === 0 ? (
          <li className="history-item neutral">
            <div className="history-empty">No bets placed yet</div>
          </li>
        ) : (
          displayedHistory.map((entry, index) => {
            const isWin = (
              (entry.betType === "number" && entry.winNum === entry.betNum) ||
              (entry.betType === "red" && RED_NUMBERS.includes(entry.winNum)) ||
              (entry.betType === "black" && BLACK_NUMBERS.includes(entry.winNum)) ||
              (entry.betType === "green" && entry.winNum === GREEN_NUMBER)
            );
            
            return (
              <li key={index} className={`history-item ${isWin ? 'win' : 'lose'}`}>
                <div className="history-entry">
                  <span className="history-result-icon">{getResultIcon(entry)}</span>
                  <span className="history-details">
                    <span className="history-type" style={{ color: getBetColor(entry) }}>
                      {formatBetType(entry.betType)}
                    </span>
                    {entry.betType === "number" && (
                      <span className="history-number">#{entry.betNum}</span>
                    )}
                    <span className="history-amount">₹{entry.betAmt}</span>
                    <span className="history-outcome">
                      → {entry.winNum} {isWin ? "(Won)" : "(Lost)"}
                    </span>
                  </span>
                </div>
              </li>
            );
          })
        )}
      </ul>
      
      {history.length > 5 && (
        <button 
          className="history-expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : `Show All (${history.length})`}
        </button>
      )}
    </div>
  );
}
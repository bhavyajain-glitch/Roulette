import { useState, useEffect } from "react";
import "../styles/Bets.css";

export default function Bets({ bet, setBet, betType, setBetType, betNumber, setBetNumber }) {
  const [activeField, setActiveField] = useState(null);

  // Validate number input for betNumber (0-36)
  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 36) {
      setBetNumber(value);
    } else if (e.target.value === "") {
      setBetNumber(null);
    }
  };

  return (
    <div className="bets-container">
      <div className="bet-input-group">
        <label className={`bet-label ${activeField === 'amount' ? 'active' : ''}`}>
          Bet Amount
        </label>
        <input
          type="number"
          className={`bet-input ${activeField === 'amount' ? 'active' : ''}`}
          placeholder="₹100"
          value={bet || ""}
          onChange={(e) => setBet(Number(e.target.value))}
          onFocus={() => setActiveField('amount')}
          onBlur={() => setActiveField(null)}
          min="1"
          step="10"
        />
      </div>

      {betType === "number" && (
        <div className="bet-input-group">
          <label className={`bet-label ${activeField === 'number' ? 'active' : ''}`}>
            Number (0-36)
          </label>
          <input
            type="number"
            className={`bet-input ${activeField === 'number' ? 'active' : ''}`}
            placeholder="0-36"
            value={betNumber || ""}
            onChange={handleNumberChange}
            onFocus={() => setActiveField('number')}
            onBlur={() => setActiveField(null)}
            min="0"
            max="36"
          />
        </div>
      )}

      <div className="bet-input-group">
        <label className="bet-label">Bet Type</label>
        <div className="bet-type-selector">
          {['number', 'red', 'black', 'green'].map((type) => (
            <button
              key={type}
              className={`bet-type-btn ${betType === type ? 'active' : ''}`}
              onClick={() => setBetType(type)}
            >
              {type === 'number' && 'Straight'}
              {type === 'red' && 'Red'}
              {type === 'black' && 'Black'}
              {type === 'green' && 'Green (0)'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
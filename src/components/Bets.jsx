import { useState, useEffect } from "react";
import "../styles/Bets.css";

export default function Bets({ bet, setBet, betType, setBetType, betNumber, setBetNumber }) {
  const [activeField, setActiveField] = useState(null);
  const [chipAnimation, setChipAnimation] = useState(false);

  const handleNumberChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 36) {
      setBetNumber(value);
    } else if (e.target.value === "") {
      setBetNumber(null);
    }
  };


  useEffect(() => {
    if (bet > 0) {
      setChipAnimation(true);
      const timer = setTimeout(() => setChipAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [bet]);

  const handleBetChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setBet(value);
  };

  return (
    <div className="bets-container">
      <div className="bet-input-group">
        <label className={`bet-label ${activeField === 'amount' ? 'active' : ''}`}>
          Bet Amount
        </label>
        <div className="bet-input-wrapper">
          <input
            type="number"
            className={`bet-input ${activeField === 'amount' ? 'active' : ''}`}
            placeholder="₹100"
            value={bet || ""}
            onChange={handleBetChange}
            onFocus={() => setActiveField('amount')}
            onBlur={() => setActiveField(null)}
            min="1"
            step="10"
          />
          <div className={`chip ${chipAnimation ? 'animate' : ''}`}>
            <div className="chip-value">₹{bet || 0}</div>
          </div>
        </div>
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
              data-type={type}
            >
              {type === 'number' && (
                <>
                  <span className="bet-icon">🔢</span> Straight
                </>
              )}
              {type === 'red' && (
                <>
                  <span className="bet-icon" style={{ color: '#ff3131' }}>●</span> Red
                </>
              )}
              {type === 'black' && (
                <>
                  <span className="bet-icon" style={{ color: '#222' }}>●</span> Black
                </>
              )}
              {type === 'green' && (
                <>
                  <span className="bet-icon" style={{ color: '#0f9d58' }}>0</span> Green
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
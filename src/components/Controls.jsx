import { useState } from "react";
import "../styles/Controls.css";

export default function Controls({ setBalance, setBet, setBetNumber, setBetType, setHistory, setResult }) {
  const [isConfirming, setIsConfirming] = useState(false);

  function resetGame() {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
      return;
    }
    
    setBalance(1000);
    setBet(0);
    setBetNumber(null);
    setBetType("number");
    setHistory([]);
    setResult(null);
    setIsConfirming(false);
  }

  return (
    <div className="controls-container">
      <button 
        className={`reset-button ${isConfirming ? 'confirm' : ''}`}
        onClick={resetGame}
      >
        {isConfirming ? (
          <>
            <span className="pulse-dot"></span>
            Confirm Reset? 
            <span className="pulse-dot"></span>
          </>
        ) : (
          "Reset Game 🔄"
        )}
      </button>
    </div>
  );
}
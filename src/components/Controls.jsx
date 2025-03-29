import { useState, useEffect } from "react";
import "../styles/Controls.css";

export default function Controls({ 
  setBalance, 
  setBet, 
  setBetNumber, 
  setBetType, 
  setHistory, 
  setResult 
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [resetProgress, setResetProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timer;
    if (isConfirming) {
      const startTime = Date.now();
      const duration = 3000; // 3 seconds confirmation window
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setResetProgress(progress);
        
        if (progress < 100) {
          timer = requestAnimationFrame(updateProgress);
        } else {
          setIsConfirming(false);
          setResetProgress(0);
        }
      };
      
      timer = requestAnimationFrame(updateProgress);
    }
    
    return () => cancelAnimationFrame(timer);
  }, [isConfirming]);

  const resetGame = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    // Reset game state
    setBalance(1000);
    setBet(0);
    setBetNumber(null);
    setBetType("number");
    setHistory([]);
    setResult(null);
    setIsConfirming(false);
    setResetProgress(0);
    
    // Celebration effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="controls-container">
      <button 
        className={`reset-button ${isConfirming ? 'confirm' : ''}`}
        onClick={resetGame}
      >
        {isConfirming ? (
          <div className="confirm-content">
            <span className="pulse-dot"></span>
            <span className="confirm-text">CONFIRM RESET</span>
            <span className="pulse-dot"></span>
            <div 
              className="reset-progress" 
              style={{ width: `${resetProgress}%` }}
            ></div>
          </div>
        ) : (
          <>
            <span className="reset-icon">🔄</span>
            RESET GAME
          </>
        )}
      </button>
      
      {showConfetti && (
        <div className="confetti-overlay"></div>
      )}
    </div>
  );
}
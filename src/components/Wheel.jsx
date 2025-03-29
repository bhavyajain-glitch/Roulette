import { useState, useRef, useEffect } from "react";
import "../styles/Wheel.css";
import spinSoundFile from "../assets/Spinning.mp3";
import winSoundFile from "../assets/Winning.mp3";
import loseSoundFile from "../assets/Losing.wav";
import confetti from "canvas-confetti";

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34,36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const GREEN_NUMBER = 0;
const NUMBERS_ON_WHEEL = 37;

export default function Wheel({ balance, setBalance, bet, betType, betNumber, setResult, history, setHistory }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [flashResult, setFlashResult] = useState(null);
  const [spinCount, setSpinCount] = useState(0);
  const wheelRef = useRef(null);
  
  const spinSound = useRef(new Audio(spinSoundFile));
  const winSound = useRef(new Audio(winSoundFile));
  const loseSound = useRef(new Audio(loseSoundFile));

  useEffect(() => {
    spinSound.current.volume = 0.6;
    winSound.current.volume = 0.6;
    loseSound.current.volume = 0.6;
  }, []);

  const getColor = (number) => {
    if (RED_NUMBERS.includes(number)) return "#FF3131";
    if (BLACK_NUMBERS.includes(number)) return "#222";
    if (number === GREEN_NUMBER) return "#0F9D58";
    return "white";
  };

  const spinWheel = () => {
    if (isSpinning) return;
    if (bet <= 0 || bet > balance) {
      setFlashResult({ message: "Invalid bet! Enter a valid bet.", type: "error" });
      return;
    }

    setIsSpinning(true);
    setBalance(prev => prev - bet);
    setResult(null);
    spinSound.current.currentTime = 0;
    spinSound.current.play();

    // Reset wheel position
    const wheel = wheelRef.current;
    if (wheel) {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';
      // Force reflow
      void wheel.offsetWidth;
    }

    // Random number animation during spin
    const animationInterval = setInterval(() => {
      setDisplayedNumber(Math.floor(Math.random() * NUMBERS_ON_WHEEL));
    }, 100);

    const finalNumber = Math.floor(Math.random() * NUMBERS_ON_WHEEL);
    const anglePerNumber = 360 / NUMBERS_ON_WHEEL;
    const finalAngle = 360 * 5 + finalNumber * anglePerNumber;

    if (wheel) {
      wheel.style.transition = "transform 6s cubic-bezier(0.17, 0.89, 0.32, 1.28)";
      wheel.style.transform = `rotate(${finalAngle}deg)`;
    }

    setTimeout(() => {
      clearInterval(animationInterval);
      setDisplayedNumber(finalNumber);
      setResult(finalNumber);
      calculateWinnings(finalNumber);
      updateHistory(betType, betNumber, bet, finalNumber);
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);
    }, 6000);
  };

  const celebrateWin = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffffff', '#ff3131']
    });
  };

  const calculateWinnings = (winningNumber) => {
    let winnings = 0;
    let winMessage = `😢 You lost! Winning number was ${winningNumber}`;
    let isWin = false;

    if (betType === "number" && winningNumber === betNumber) {
      winnings = bet * 35;
      winMessage = `🎉 You won ₹${winnings.toLocaleString()}!`;
      isWin = true;
    } else if (betType === "red" && RED_NUMBERS.includes(winningNumber)) {
      winnings = bet * 2;
      winMessage = `🎉 You won ₹${winnings.toLocaleString()}!`;
      isWin = true;
    } else if (betType === "black" && BLACK_NUMBERS.includes(winningNumber)) {
      winnings = bet * 2;
      winMessage = `🎉 You won ₹${winnings.toLocaleString()}!`;
      isWin = true;
    } else if (betType === "green" && winningNumber === GREEN_NUMBER) {
      winnings = bet * 35;
      winMessage = `🎉 You won ₹${winnings.toLocaleString()}!`;
      isWin = true;
    }

    if (isWin) {
      setBalance(prev => prev + winnings);
      winSound.current.currentTime = 0;
      winSound.current.play();
      celebrateWin();
    } else {
      loseSound.current.currentTime = 0;
      loseSound.current.play();
    }

    setFlashResult({ 
      message: winMessage, 
      number: winningNumber, 
      type: isWin ? "win" : "lose" 
    });

    setTimeout(() => setFlashResult(null), 4000);
  };

  const updateHistory = (type, number, amount, result) => {
    const newHistory = [...history, {
      type,
      number,
      amount,
      result,
      timestamp: new Date().toLocaleTimeString(),
      winNum: result,
      betNum: number,
      betAmt: amount,
      betType: type
    }];
    setHistory(newHistory.slice(-10));
  };

  return (
    <div className="roulette-container">
      {flashResult && (
        <div className={`result-card ${flashResult.type}`}>
          <div className="result-number" style={{ backgroundColor: getColor(flashResult.number) }}>
            {flashResult.number}
          </div>
          {flashResult.message}
        </div>
      )}

      <div className="wheel-container">
        <div className="wheel" ref={wheelRef}></div>
        <div className="wheel-pointer"></div>
      </div>

      <div className="controls-container">
        <div 
          className="roulette-number" 
          style={{ 
            backgroundColor: getColor(displayedNumber),
            boxShadow: `0 0 15px ${getColor(displayedNumber)}`
          }}
        >
          {displayedNumber}
        </div>
        <button 
          className={`spin-button ${isSpinning ? 'spinning' : ''}`} 
          onClick={spinWheel} 
          disabled={isSpinning}
        >
          {isSpinning ? (
            <span className="spinner"></span>
          ) : (
            <>
              🎰 Spin
              <span className="pulse-effect"></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
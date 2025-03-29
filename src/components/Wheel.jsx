import { useState, useRef, useEffect } from "react";
import "../styles/Wheel.css";
import spinSoundFile from "../assets/Spinning.mp3";
import winSoundFile from "../assets/Winning.mp3";
import loseSoundFile from "../assets/Losing.wav";
import confetti from "canvas-confetti";

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33,35];
const GREEN_NUMBER = 0;
const NUMBERS_ON_WHEEL = 37;

export default function Wheel({ balance, setBalance, bet, betType, betNumber, setResult, history, setHistory }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedNumber, setDisplayedNumber] = useState(0);
  const [flashResult, setFlashResult] = useState(null);
  const wheelRef = useRef(null);
  
  const spinSound = useRef(new Audio(spinSoundFile));
  const winSound = useRef(new Audio(winSoundFile));
  const loseSound = useRef(new Audio(loseSoundFile));

  useEffect(() => {
    spinSound.current.volume = 0.6;
    winSound.current.volume = 0.6;
    loseSound.current.volume = 0.6;
  }, []);

  function getColor(number) {
    if (RED_NUMBERS.includes(number)) return "#FF3131";
    if (BLACK_NUMBERS.includes(number)) return "#222";
    if (number === GREEN_NUMBER) return "#0F9D58";
    return "white";
  }

  function spinWheel() {
    if (isSpinning) return;
    if (bet <= 0 || bet > balance) {
      setFlashResult({ message: "Invalid bet! Enter a valid bet.", type: "error" });
      return;
    }

    setIsSpinning(true);
    setBalance(balance - bet);
    setResult(null);
    spinSound.current.play();

    // Reset wheel position before starting new spin
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
      // Force reflow to apply the reset
      void wheelRef.current.offsetHeight;
    }

    let animationInterval = setInterval(() => {
      setDisplayedNumber(Math.floor(Math.random() * NUMBERS_ON_WHEEL));
    }, 100);

    const finalNumber = Math.floor(Math.random() * NUMBERS_ON_WHEEL);
    const anglePerNumber = 360 / NUMBERS_ON_WHEEL;
    const finalAngle = 360 * 5 + finalNumber * anglePerNumber;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 6s cubic-bezier(0.25, 1, 0.5, 1)";
      wheelRef.current.style.transform = `rotate(${finalAngle}deg)`;
    }

    setTimeout(() => {
      clearInterval(animationInterval);
      setDisplayedNumber(finalNumber);
      setResult(finalNumber);
      calculateWinnings(finalNumber);
      updateHistory(betType, betNumber, bet, finalNumber);
      setIsSpinning(false);
      
      // Reset transition after spin completes
      if (wheelRef.current) {
        setTimeout(() => {
          wheelRef.current.style.transition = 'none';
          wheelRef.current.style.transform = 'rotate(0deg)';
        }, 100);
      }
    }, 6000);
  }

  function celebrateWin() {
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  }

  function calculateWinnings(winningNumber) {
    let winnings = 0;
    let winMessage = `😢 You lost! Winning number was ${winningNumber}`;

    if (betType === "number" && winningNumber === betNumber) {
      winnings = bet * 35;
      winMessage = `🎉 You won ₹${winnings}!`;
    } else if (betType === "red" && RED_NUMBERS.includes(winningNumber)) {
      winnings = bet * 2;
      winMessage = `🎉 You won ₹${winnings}!`;
    } else if (betType === "black" && BLACK_NUMBERS.includes(winningNumber)) {
      winnings = bet * 2;
      winMessage = `🎉 You won ₹${winnings}!`;
    } else if (betType === "green" && winningNumber === GREEN_NUMBER) {
      winnings = bet * 35;
      winMessage = `🎉 You won ₹${winnings}!`;
    }

    if (winnings > 0) {
      setBalance((prevBalance) => prevBalance + winnings);
      winSound.current.play();
      celebrateWin();
    } else {
      loseSound.current.play();
    }

    setFlashResult({ message: winMessage, number: winningNumber, type: winnings > 0 ? "win" : "lose" });

    setTimeout(() => setFlashResult(null), 4000);
  }

  function updateHistory(type, number, amount, result) {
    const newHistory = [...history, {
      type,
      number,
      amount,
      result,
      timestamp: new Date().toLocaleTimeString()
    }];
    setHistory(newHistory.slice(-10)); // Keep only last 10 entries
  }

  return (
    <div className="roulette-container">
      {flashResult && <div className={`result-card ${flashResult.type}`}>{flashResult.message}</div>}

      <div className="wheel-container">
        <div className="wheel" ref={wheelRef}></div>
      </div>

      <div className="controls-container">
        <div className="roulette-number" style={{ backgroundColor: getColor(displayedNumber) }}>
          {displayedNumber}
        </div>
        <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
          🎰 Spin
        </button>
      </div>
    </div>
  );
}
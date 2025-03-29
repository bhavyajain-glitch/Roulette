import { useState, useRef, useEffect } from "react";
import "../styles/Wheel.css";
import spinSoundFile from "../assets/Spinning.mp3";
import winSoundFile from "../assets/Winning.mp3";
import loseSoundFile from "../assets/Losing.wav";
import confetti from "canvas-confetti";

export default function Wheel({ balance, setBalance, bet, betNumber, setResult, history, setHistory }) {
  const [angle, setAngle] = useState(0);
  const wheelRef = useRef(null);

  const spinSound = new Audio(spinSoundFile);
  const winSound = new Audio(winSoundFile);
  const loseSound = new Audio(loseSoundFile);

  function spinWheel() {
    if (bet <= 0 || betNumber === null || bet > balance) {
      alert("Invalid bet! Enter a valid bet and choose a number.");
      return;
    }

    spinSound.play();

    let randomSpins = Math.floor(Math.random() * 5) + 3;
    let finalAngle = 360 * randomSpins + Math.floor(Math.random() * 360);
    let winningNumber = Math.floor((finalAngle % 360) / (360 / 37));

    setBalance(balance - bet);
    setResult(null);
    setAngle(finalAngle % 360);

    setTimeout(() => {
      setResult(winningNumber);
      calculateWinnings(winningNumber);
      updateHistory(betNumber, bet, winningNumber);
    }, 3000);
  }

  function celebrateWin() {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function calculateWinnings(winningNumber) {
    if (winningNumber === betNumber) {
      let winnings = bet * 35;
      setBalance(prevBalance => prevBalance + winnings);
      winSound.play();
      celebrateWin();
      alert(`🎉 You won ₹${winnings}!`);
    } else {
      loseSound.play();
      alert(`😢 You lost! Winning number was ${winningNumber}`);
    }
  }

  function updateHistory(betNum, betAmt, winNum) {
    let newHistory = [...history, { betNum, betAmt, winNum }];
    if (newHistory.length > 5) newHistory.shift();
    setHistory(newHistory);
  }

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 3s ease-out";
      wheelRef.current.style.transform = `rotate(${angle}deg)`;
    }
  }, [angle]);

  return (
    <div className="wheel-container">
      <div className="wheel" ref={wheelRef}></div>
      <button onClick={spinWheel}>Spin 🎡</button>
    </div>
  );
}

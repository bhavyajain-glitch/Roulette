import { useState } from "react";
import "../styles/Wheel.css";

export default function Wheel() {
  const [angle, setAngle] = useState(0);

  function spinWheel() {
    let randomSpins = Math.floor(Math.random() * 10) + 5; // Random 5-15 spins
    let finalAngle = 360 * randomSpins + Math.floor(Math.random() * 360);
    setAngle(finalAngle);
  }

  return (
    <div className="roulette-container">
      <div className="roulette-wheel" style={{ transform: `rotate(${angle}deg)` }}>
        {[...Array(37)].map((_, i) => (
          <div key={i} className="roulette-number">{i}</div>
        ))}
      </div>
      <button onClick={spinWheel}>Spin 🎡</button>
    </div>
  ); 
}

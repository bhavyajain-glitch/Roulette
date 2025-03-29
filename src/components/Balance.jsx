import { useEffect, useState } from "react";
import "../styles/Balance.css";

export default function Balance({ balance }) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [animationClass, setAnimationClass] = useState("");
  const [prevBalance, setPrevBalance] = useState(balance);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    if (balance !== prevBalance) {
      const diff = balance - prevBalance;
      setDifference(diff);
      
      // Determine animation class based on balance change
      if (diff > 0) {
        setAnimationClass("balance-update balance-win");
      } else if (diff < 0) {
        setAnimationClass("balance-update balance-lose");
      }

      // Animate the counting effect
      const duration = 1000; // ms
      const start = prevBalance;
      const end = balance;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = start + (end - start) * progress;
        setDisplayBalance(currentValue.toFixed(2));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayBalance(end);
          setPrevBalance(end);
          setTimeout(() => setAnimationClass(""), 500);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [balance]);

  return (
    <div className={`balance-container ${animationClass}`}>
      <span className="balance-label">Your Balance</span>
      <div className="balance-amount">
        <span className="balance-currency">₹</span>
        {displayBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        {difference !== 0 && (
          <span className={`balance-difference ${difference > 0 ? 'positive' : 'negative'}`}>
            {difference > 0 ? '+' : ''}{difference.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
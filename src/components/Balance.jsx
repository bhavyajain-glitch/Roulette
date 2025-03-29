import { useEffect, useState } from "react";
import "../styles/Balance.css";

export default function Balance({ balance }) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [animationClass, setAnimationClass] = useState("");
  const [prevBalance, setPrevBalance] = useState(balance);

  useEffect(() => {
    if (balance !== prevBalance) {
      const difference = balance - prevBalance;
      
      // Determine animation class based on balance change
      if (difference > 0) {
        setAnimationClass("balance-update balance-win");
      } else if (difference < 0) {
        setAnimationClass("balance-update balance-lose");
      }

      // Update display balance after a short delay for smooth animation
      const timer = setTimeout(() => {
        setDisplayBalance(balance);
        setPrevBalance(balance);
        setAnimationClass("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [balance, prevBalance]);

  return (
    <div className={`balance-container ${animationClass}`}>
      <span className="balance-label">Your Balance</span>
      <div className="balance-amount">
        <span className="balance-currency">₹</span>
        {displayBalance.toFixed(2)}
      </div>
    </div>
  );
}
export default function Bets({ bet, setBet, betNumber, setBetNumber }) {
    return (
      <div>
        <input
          type="number"
          placeholder="Enter bet amount"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Enter number (0-36)"
          value={betNumber || ""}
          onChange={(e) => setBetNumber(Number(e.target.value))}
        />
      </div>
    );
  }
  
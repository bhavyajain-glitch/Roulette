export default function Bets({ bet, setBet, betType, setBetType, betNumber, setBetNumber }) {
    return (
      <div>
        <input
          type="number"
          placeholder="Enter bet amount"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
        />
  
        {betType === "number" && (
          <input
            type="number"
            placeholder="Enter number (0-36)"
            value={betNumber || ""}
            onChange={(e) => setBetNumber(Number(e.target.value))}
          />
        )}
  
        <select onChange={(e) => setBetType(e.target.value)} value={betType}>
          <option value="number">Straight Number</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="green">Green (0)</option>
        </select>
      </div>
    );
  }
  
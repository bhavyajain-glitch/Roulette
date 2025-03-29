export default function Controls({ setBalance, setBet, setBetNumber, setBetType, setHistory, setResult }) {
    function resetGame() {
      setBalance(1000);
      setBet(0);
      setBetNumber(null);
      setBetType("number");
      setHistory([]);
      setResult(null);
    }
  
    return <button onClick={resetGame}>Reset Game 🔄</button>;
  }
  
export default function Controls({ setBalance, setBet, setBetNumber, setHistory, setResult }) {
    function resetGame() {
      setBalance(1000);
      setBet(0);
      setBetNumber(null);
      setHistory([]);
      setResult(null);
    }
  
    return <button onClick={resetGame}>Reset Game 🔄</button>;
  }
  
import { useState } from "react";
import "./App.css";
import Wheel from "./components/Wheel";
import Bets from "./components/Bets";
import Balance from "./components/Balance";
import Controls from "./components/Controls";
import History from "./components/History";

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [betType, setBetType] = useState("number"); // "number", "red", "black", "green"
  const [betNumber, setBetNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
    <h1 className="game-title">Roulette Game</h1>
      <Balance balance={balance} />
      <div className="game-section">
        <Wheel 
          balance={balance} setBalance={setBalance}
          bet={bet} betType={betType} setBetType={setBetType}
          betNumber={betNumber} setBetNumber={setBetNumber}
          result={result} setResult={setResult}
          history={history} setHistory={setHistory}
        />
        <Bets bet={bet} setBet={setBet} betType={betType} setBetType={setBetType} betNumber={betNumber} setBetNumber={setBetNumber} />
      </div>
      <Controls setBalance={setBalance} setBet={setBet} setBetNumber={setBetNumber} setBetType={setBetType} setHistory={setHistory} setResult={setResult} />
      <History history={history} />
    </div>
  );
}

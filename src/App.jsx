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
  const [betNumber, setBetNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>Roulette Game</h1>
      <Balance balance={balance} />
      <Wheel 
        balance={balance} setBalance={setBalance}
        bet={bet} setBet={setBet}
        betNumber={betNumber} setBetNumber={setBetNumber}
        result={result} setResult={setResult}
        history={history} setHistory={setHistory}
      />
      <Bets bet={bet} setBet={setBet} betNumber={betNumber} setBetNumber={setBetNumber} />
      <Controls setBalance={setBalance} setBet={setBet} setBetNumber={setBetNumber} setHistory={setHistory} setResult={setResult} />
      <History history={history} />
    </div>
  );
}



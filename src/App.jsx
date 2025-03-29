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
  const [betType, setBetType] = useState("number");
  const [betNumber, setBetNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
      <div className="game-header">
        <h1 className="game-title">Roulette Royale</h1>
        <Balance balance={balance} />
      </div>
      
      <div className="game-layout">
        <div className="game-main">
          <Wheel 
            balance={balance} 
            setBalance={setBalance}
            bet={bet} 
            betType={betType}
            betNumber={betNumber}
            setResult={setResult}
            history={history}
            setHistory={setHistory}
          />
          <Controls 
            setBalance={setBalance}
            setBet={setBet}
            setBetNumber={setBetNumber}
            setBetType={setBetType}
            setHistory={setHistory}
            setResult={setResult}
          />
        </div>
        
        <div className="game-sidebar">
          <Bets 
            bet={bet} 
            setBet={setBet} 
            betType={betType} 
            setBetType={setBetType} 
            betNumber={betNumber} 
            setBetNumber={setBetNumber} 
          />
          <History history={history} />
        </div>
      </div>
    </div>
  );
}
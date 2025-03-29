import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Wheel from "./components/Wheel";
import Bets from "./components/Bets";
import Balance from "./components/Balance";
import Controls from "./components/Controls";
import History from "./components/History";

export default function App() {
  return (
    <div>
      <h1>Roulette Game</h1>
      <Balance />
      <Wheel />
      <Bets />
      <Controls />
      <History />
    </div>
  );
}



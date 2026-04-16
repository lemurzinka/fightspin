import React, { useState, useEffect, useMemo } from 'react';
import SlotView from './view/SlotView';
import GameFacade from './facade/GameFacade';

function App() {
  const [state, setState] = useState({ balance: 0, result: null });
  const [bet, setBet] = useState(100); 


  const facade = useMemo(() => new GameFacade('http://localhost:5000'), []);

  useEffect(() => {
    facade.getState().then(data => {
      setState({ balance: data.balance, result: null });
    });
  }, [facade]);

  const handleSpin = async () => {
    const data = await facade.spin(bet); 
    setState({ balance: data.balance, result: data.result });
  };

  return (
    <div>
      <h1>FightSpin</h1>
     <input 
  type="number" 
  value={bet} 
  onChange={(e) => setBet(parseInt(e.target.value, 10) || 0)} 
  placeholder="Enter your bet"
/>

      <SlotView state={state} onSpin={handleSpin} />
    </div>
  );
}

export default App;

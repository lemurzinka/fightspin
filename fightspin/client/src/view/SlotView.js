import React from 'react';

export default function SlotView({ state, onSpin }) {
  return (
    <div>
      <p>Balance: {state.balance}</p>
      {state.result && (
  <div>
    {state.result.status === "WIN" ? (
      <p>🎉 Dropped {state.result.count} symbols "{state.result.symbol}" → you won: {state.result.payout}</p>
    ) : (
      <p>❌ You lose</p>
    )}
  </div>
)}

      <button onClick={onSpin}>Spin</button>
    </div>
  );
}


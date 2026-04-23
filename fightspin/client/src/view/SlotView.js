import React from 'react';

export default function SlotView({ state, onSpin }) {
  const result = state.result;

  return (
    <div>
      <p>Balance: {state.balance}</p>

      {result && (
        <div>
          {/* Grid */}
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            {Array.isArray(result.grid) && result.grid.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex' }}>
                {row.map((cell, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      border: '1px solid #ccc',
                      padding: '6px 10px',
                      minWidth: '80px',
                      textAlign: 'center',
                      background: '#f9f9f9',
                      margin: '2px'
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Result */}
          {result.status === "WIN" ? (
            <div>
              <p>🎉 Total payout: {result.payout}</p>
              <ul>
                {Array.isArray(result.lines) && result.lines.length > 0 ? (
                  result.lines.map((line, idx) => (
                    <li key={idx}>
                      {line.reason} → {line.payout}
                    </li>
                  ))
                ) : (
                  <li>No winning lines</li>
                )}
              </ul>
            </div>
          ) : (
            <p>❌ You lose</p>
          )}
        </div>
      )}

      <button onClick={onSpin}>Spin</button>
    </div>
  );
}

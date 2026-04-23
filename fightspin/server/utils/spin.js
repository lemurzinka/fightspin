const symbols = {
  "Common Gloves": { 3: 15, 4: 30, 5: 100 },
  "Red Gloves": { 3: 20, 4: 40, 5: 200 },
  "Blue Gloves": { 3: 20, 4: 40, 5: 200 },
  "UFC Belt": { 3: 25, 4: 60, 5: 250 },
  "BMF Belt": { 3: 25, 4: 60, 5: 250 },
  "Referee (SCATTER)": { 3: 15, 4: 50, 5: 150 },
  "Explosion (WILD)": { 3: 50, 4: 150, 5: 500 },
  "Golden K": { 3: 10, 4: 20, 5: 80 }
};

const paylines = [
  
  [ [0,0], [0,1], [0,2], [0,3], [0,4] ],
  [ [1,0], [1,1], [1,2], [1,3], [1,4] ],
  [ [2,0], [2,1], [2,2], [2,3], [2,4] ],
  [ [3,0], [3,1], [3,2], [3,3], [3,4] ],
  [ [4,0], [4,1], [4,2], [4,3], [4,4] ],


  [ [0,0], [0,1], [0,2] ], [ [0,0], [0,1], [0,2], [0,3] ],
  [ [1,0], [1,1], [1,2] ], [ [1,0], [1,1], [1,2], [1,3] ],
  [ [2,0], [2,1], [2,2] ], [ [2,0], [2,1], [2,2], [2,3] ],
  [ [3,0], [3,1], [3,2] ], [ [3,0], [3,1], [3,2], [3,3] ],
  [ [4,0], [4,1], [4,2] ], [ [4,0], [4,1], [4,2], [4,3] ],

 
  [ [0,0], [1,0], [2,0], [3,0], [4,0] ],
  [ [0,1], [1,1], [2,1], [3,1], [4,1] ],
  [ [0,2], [1,2], [2,2], [3,2], [4,2] ],
  [ [0,3], [1,3], [2,3], [3,3], [4,3] ],
  [ [0,4], [1,4], [2,4], [3,4], [4,4] ],

  
  [ [0,0], [1,0], [2,0] ], [ [0,0], [1,0], [2,0], [3,0] ],
  [ [0,1], [1,1], [2,1] ], [ [0,1], [1,1], [2,1], [3,1] ],
  [ [0,2], [1,2], [2,2] ], [ [0,2], [1,2], [2,2], [3,2] ],
  [ [0,3], [1,3], [2,3] ], [ [0,3], [1,3], [2,3], [3,3] ],
  [ [0,4], [1,4], [2,4] ], [ [0,4], [1,4], [2,4], [3,4] ],

  
  [ [0,0], [1,1], [2,2], [3,3], [4,4] ], 
  [ [0,4], [1,3], [2,2], [3,1], [4,0] ], 

 
  [ [0,0], [1,1], [2,2] ], [ [0,0], [1,1], [2,2], [3,3] ],
  [ [1,1], [2,2], [3,3] ], [ [1,1], [2,2], [3,3], [4,4] ],
  [ [0,4], [1,3], [2,2] ], [ [0,4], [1,3], [2,2], [3,1] ],
  [ [1,3], [2,2], [3,1] ], [ [1,3], [2,2], [3,1], [4,0] ],


  [ [0,2], [1,1], [2,0], [1,1], [0,2] ],
  [ [4,2], [3,1], [2,0], [3,1], [4,2] ],

  
  [ [0,2], [1,3], [2,4], [1,3], [0,2] ],
  [ [4,2], [3,3], [2,4], [3,3], [4,2] ],


  [ [0,0], [1,1], [2,2], [3,3], [4,4] ],
  [ [0,4], [1,3], [2,2], [3,1], [4,0] ]
];



function generateGrid(rows = 5, cols = 5) {
  const weightedSymbols = [
    "Common Gloves","Common Gloves","Common Gloves","Common Gloves","Common Gloves",
    "Red Gloves","Red Gloves","Red Gloves","Red Gloves","Red Gloves",
    "Blue Gloves","Blue Gloves","Blue Gloves","Blue Gloves","Blue Gloves",
    "Golden K","Golden K","Golden K","Golden K","Golden K",
    "UFC Belt","UFC Belt","BMF Belt","BMF Belt"
  ];

  let grid = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      let symbol;
      if (c === 0) {
        const starters = ["Common Gloves","Red Gloves","Blue Gloves","Golden K"];
        symbol = starters[Math.floor(Math.random() * starters.length)];
      } else {
        const randomIndex = Math.floor(Math.random() * weightedSymbols.length);
        symbol = weightedSymbols[randomIndex];
      }
      row.push(symbol);
    }
    grid.push(row);
  }
  return grid;
}

function calculateWins(grid) {
  let lines = [];

  for (const line of paylines) {
    const lineSymbols = line.map(([r, c]) => grid[r][c]);

    let currentSymbol = lineSymbols[0];
    let count = 1;

   
    for (let i = 1; i < lineSymbols.length; i++) {
      const symbol = lineSymbols[i] === "Explosion (WILD)" ? currentSymbol : lineSymbols[i];

      if (symbol === currentSymbol) {
        count++;
      } else {
        break; 
      }
    }

    if (count >= 3 && symbols[currentSymbol] && symbols[currentSymbol][count]) {
      const winningCells = line.slice(0, count);
      lines.push({
        cells: winningCells,
        symbol: currentSymbol,
        count,
        payout: symbols[currentSymbol][count],
        reason: `${count} × ${currentSymbol}`
      });
    }
  }

  // SCATTER 
  const scatterCount = grid.flat().filter(s => s === "Referee (SCATTER)").length;
  if (scatterCount >= 3) {
    lines.push({
      cells: null,
      symbol: "Referee (SCATTER)",
      count: scatterCount,
      payout: symbols["Referee (SCATTER)"][scatterCount] || 0,
      reason: `SCATTER: ${scatterCount} Referee`
    });
  }

  if (lines.length === 0) {
    return { status: "LOSE", payout: 0, lines: [] };
  }

  const total = lines.reduce((sum, w) => sum + w.payout, 0);
  return { status: "WIN", payout: total, lines };
}


function spin() {
  const grid = generateGrid();
  const result = calculateWins(grid);
  return { grid, ...result };
}

module.exports = { spin };

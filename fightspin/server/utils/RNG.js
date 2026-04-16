


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




class SymbolStrategy {
  calculate() {
   
    if (Math.random() < 0.4) {
      return { symbol: null, count: 0, payout: 0, status: "LOSE" };
    }

   
    const keys = Object.keys(symbols);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const symbol = keys[randomIndex];

    const count = Math.floor(Math.random() * 3) + 3; 
    const payout = symbols[symbol][count];

    return { symbol, count, payout, status: "WIN" };
  }
}


class WinLoseStrategy {
  calculate() {
    return Math.random() > 0.5 ? "WIN" : "LOSE";
  }
}


class WeightedStrategy {
  calculate() {
    return Math.random() < 0.3 ? "WIN" : "LOSE";
  }
}


class BonusEveryThirdStrategy {
  constructor() {
    this.counter = 0;
  }

  calculate() {
    this.counter++;
    if (this.counter % 3 === 0) {
      return "WIN";
    }
    return Math.random() > 0.5 ? "WIN" : "LOSE";
  }
}



module.exports = { 
  WinLoseStrategy, 
  WeightedStrategy, 
  BonusEveryThirdStrategy, 
  SymbolStrategy 
};

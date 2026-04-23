

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

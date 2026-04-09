
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

module.exports = { WinLoseStrategy, WeightedStrategy, BonusEveryThirdStrategy };

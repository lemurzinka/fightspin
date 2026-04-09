class RNGContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  execute() {
    return this.strategy.calculate();
  }
}

module.exports = RNGContext;

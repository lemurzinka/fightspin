class GameRepository {
  constructor() {
    if (GameRepository.instance) {
      return GameRepository.instance;
    }
    this.balance = 1000;
    this.history = [];
    GameRepository.instance = this;
  }

  getBalance() {
    return this.balance;
  }

  updateBalance(amount) {
    this.balance += amount;
  }

  saveResult(result) {
    this.history.push({
      result,
      balance: this.balance,
      timestamp: new Date()
    });
  }

  getHistory() {
    return this.history;
  }
}

module.exports = GameRepository;

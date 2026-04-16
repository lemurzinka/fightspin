class SpinGameUseCase {
  constructor(repository, rngExecutor) {
    this.repository = repository;
    this.rngExecutor = rngExecutor;
    this.betAmount = 100; 
  }

  execute() {
    const result = this.rngExecutor();

    if (result.status === "WIN") {
      this.repository.updateBalance(result.payout);
    } else {
      this.repository.updateBalance(-this.betAmount); 
    }

    this.repository.saveResult(result);

    return {
      balance: this.repository.getBalance(),
      result
    };
  }
}

module.exports = SpinGameUseCase;

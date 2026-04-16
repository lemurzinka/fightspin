class SpinGameUseCase {
  constructor(repository, rngExecutor) {
    this.repository = repository;
    this.rngExecutor = rngExecutor;
  }

  execute(betAmount) {
    const result = this.rngExecutor();

    if (result.status === "WIN") {
      this.repository.updateBalance(result.payout);
    } else {
      this.repository.updateBalance(-betAmount); 
    }

    this.repository.saveResult(result);

    return {
      balance: this.repository.getBalance(),
      result
    };
  }
}

module.exports = SpinGameUseCase;

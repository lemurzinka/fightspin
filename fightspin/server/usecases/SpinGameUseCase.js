
class SpinGameUseCase {
  constructor(gameRepository, rng) {
    this.gameRepository = gameRepository;
    this.rng = rng;
  }

  execute() {
    const result = this.rng();
    if (result === "WIN") {
      this.gameRepository.updateBalance(10);
    } else {
      this.gameRepository.updateBalance(-5);
    }
    this.gameRepository.saveResult(result);

    return {
      balance: this.gameRepository.getBalance(),
      result,
      history: this.gameRepository.getHistory()
    };
  }
}

module.exports = SpinGameUseCase;

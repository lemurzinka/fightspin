const GameRepository = require('../repository/GameRepository');
const SpinGameUseCase = require('../usecases/SpinGameUseCase');
const RNGContext = require('../utils/RNGContext');
const { WinLoseStrategy, WeightedStrategy, BonusEveryThirdStrategy, SymbolStrategy } = require('../utils/RNG');

class ServiceLocator {
  constructor() {
    this.services = new Map();
    this.registerDependencies();
  }

  registerDependencies() {
    const repository = new GameRepository();

    
    const rng = new RNGContext();
    rng.setStrategy(new SymbolStrategy()); 

    const spinUseCase = new SpinGameUseCase(repository, () => rng.execute());

    this.services.set('GameRepository', repository);
    this.services.set('SpinGameUseCase', spinUseCase);
  }

  get(name) {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} not found`);
    }
    return this.services.get(name);
  }
}

module.exports = new ServiceLocator();

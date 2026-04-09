import ServiceLocator from './ServiceLocator';
import GameModel from '../model/GameModel';
import GameIntent from '../intent/GameIntent';
import { getRandomResult } from '../utils/RNG';

export function registerServices() {
  const model = new GameModel();
  const intent = new GameIntent(model, getRandomResult);

  ServiceLocator.register('GameModel', model);
  ServiceLocator.register('GameIntent', intent);
}

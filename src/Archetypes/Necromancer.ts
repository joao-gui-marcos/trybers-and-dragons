import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _count = 0;

  constructor(name:string) {
    super(name);
    Necromancer._count += 1;
    this._energyType = 'mana';
  }

  get energyType():EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances():number {
    return this._count;
  }
}
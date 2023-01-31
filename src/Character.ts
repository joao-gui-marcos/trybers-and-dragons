import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _race:Race;
  private _archetype:Archetype;
  private _maxLifePoints:number;
  private _lifePoints:number;
  private _strength:number;
  private _defense:number;
  private _dexterity:number;
  private _energy:Energy;

  constructor(name:string) {
    this._dexterity = Math.floor(Math.random() * (9)) + 1;
    this._strength = Math.floor(Math.random() * (9)) + 1;
    this._defense = Math.floor(Math.random() * (9)) + 1;
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = { 
      type_: this._archetype.energyType,
      amount: Math.floor(Math.random() * (9)) + 1, 
    };
  }

  get lifePoints():number { return this._lifePoints; }
  get strength():number { return this._strength; }
  get defense():number { return this._defense; }
  get dexterity():number { return this._dexterity; }
  get energy():Energy {
    return { 
      type_: this._energy.type_,
      amount: this._energy.amount,
    }; 
  }

  get race():Race { return this._race; }
  get archetype():Archetype { return this._archetype; }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (damage <= 0) {
      this._lifePoints -= 1;
    }
    if (this.lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += 1;
    this._strength += 1;
    this._dexterity += 1;
    this._defense += 1;
    this._energy.amount = 10;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  heal():void {
    this._lifePoints = this._race.maxLifePoints / 2;
  }
}
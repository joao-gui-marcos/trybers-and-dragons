import Character from '../Character';
import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  public victory = '';
  constructor(
    char1: Character | Fighter, 
    char2:Monster[] | SimpleFighter[] | Fighter[],
  ) {
    super(char1);
    while (char1.lifePoints !== -1 
      && char2.every((elem) => elem.lifePoints !== -1)) {
      const nextMonster = char2.find((e) => e.lifePoints !== -1);
      char1.attack(nextMonster as Monster);
      nextMonster?.attack(char1);
    }
    if (super.fight() === 1) {
      this.victory = 'char1';
    }
    if (super.fight() === -1) {
      this.victory = 'char2';
    }
  }
}
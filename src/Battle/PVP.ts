import Character from '../Character';
import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  public victory = '';
  constructor(char1:Character | Fighter, char2:Character | Fighter) {
    super(char1);
    while (char1.lifePoints !== -1 && char2.lifePoints !== -1) {
      char1.attack(char2);
      char2.attack(char1);
    }
    if (super.fight() === 1) {
      this.victory = 'char1';
    }
    if (super.fight() === -1) {
      this.victory = 'char2';
    }
  }
}
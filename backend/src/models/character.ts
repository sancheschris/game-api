export enum Job {
  Warrior = "Warrior",
  Thief = "Thief",
  Mage = "Mage",
}

export interface Character {
  id: string;
  name: string;
  job: Job;
  health: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attackModifier: number;
  speedModifier: number;
}

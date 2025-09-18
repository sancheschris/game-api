export type Job = "Warrior" | "Thief" | "Mage";

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

import { randomUUID } from "crypto";
import { Character, Job } from "../models/character";

export function createCharacter(name: string, job: Job): Character {
  let health = 0,
    strength = 0,
    dexterity = 0,
    intelligence = 0;
  let attackModifier = 0,
    speedModifier = 0;

  switch (job) {
    case "Warrior":
      health = 20;
      strength = 10;
      dexterity = 5;
      intelligence = 5;
      attackModifier = 0.8 * strength + 0.2 * dexterity;
      speedModifier = 0.6 * dexterity + 0.2 * intelligence;
      break;

    case "Thief":
      health = 15;
      strength = 4;
      dexterity = 10;
      intelligence = 4;
      attackModifier = 0.25 * strength + dexterity + 0.25 * intelligence;
      speedModifier = 0.8 * dexterity;
      break;

    case "Mage":
      health = 12;
      strength = 5;
      dexterity = 6;
      intelligence = 10;
      attackModifier = 0.2 * strength + 0.2 * dexterity + 1.2 * intelligence;
      speedModifier = 0.4 * dexterity + 0.1 * strength;
      break;
  }

  return {
    id: randomUUID(),
    name,
    job,
    health,
    strength,
    dexterity,
    intelligence,
    attackModifier,
    speedModifier,
  };
}

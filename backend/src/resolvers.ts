import { Character, Job } from "./models/character";
import { createCharacter } from "./services/character.service";
import { validateName } from "./util/validation";

const characters: Character[] = [];

export const resolvers = {
  Query: {
    character: (_: unknown, { id }: { id: string }) => {
      return characters.find((c) => c.id === id) || null;
    },
    listCharacters: () => characters,
    jobs: () => [
      {
        name: "Warrior",
        health: 20,
        strength: 10,
        dexterity: 5,
        intelligence: 5,
        attack: "80% of Strength + 20% Dexterity",
        speed: "60% Dexterity + 20% Intelligence",
      },
      {
        name: "Thief",
        health: 15,
        strength: 4,
        dexterity: 10,
        intelligence: 4,
        attack: "25% of Strength + 100% Dexterity + 25% Intelligence",
        speed: "80% Dexterity",
      },
      {
        name: "Mage",
        health: 12,
        strength: 5,
        dexterity: 6,
        intelligence: 10,
        attack: "20% of Strength + 20% Dexterity + 120% Intelligence",
        speed: "40% Dexterity + 10% Strength",
      },
    ],
  },
  Mutation: {
    createCharacter: (_: any, { name, job }: { name: string; job: Job }) => {
      const result = createCharacter(name, job);

      if (result.success && result.character) {
        characters.push(result.character);
      }

      return result;
    },
  },
};

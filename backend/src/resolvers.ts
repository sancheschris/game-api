import { Character, Job } from "./models/character";
import { createCharacter } from "./services/character.service";

const characters: Character[] = [];

export const resolvers = {
  Query: {
    character: (_: unknown, { id }: { id: string }) => {
      return characters.find((c) => c.id === id) || null;
    },
    listCharacters: () => characters,
  },
  Mutation: {
    createCharacter: (_: any, { name, job }: { name: string; job: Job }) => {
      const character = createCharacter(name, job);
      characters.push(character);
      return character;
    },
  },
};

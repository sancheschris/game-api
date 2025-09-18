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

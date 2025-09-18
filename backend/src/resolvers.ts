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
      const nameErrors = validateName(name);
      const jobErrors = validateName(job);
      const errors = [...nameErrors, ...jobErrors];

      if (errors.length > 0) {
        return { success: false, errors };
      }

      const character = createCharacter(name, job);
      characters.push(character);
      return character;
    },
  },
};

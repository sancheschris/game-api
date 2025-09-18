import {
  CharacterService,
  Job,
  CreateCharacterInput,
} from "../services/character.service";

describe("CharacterService", () => {
  beforeEach(() => {
    // Clear characters before each test
    const characters = CharacterService.getAllCharacters();
    characters.length = 0;
  });

  describe("validateName", () => {
    it("should accept valid names", () => {
      expect(CharacterService.validateName("ValidName")).toEqual([]);
      expect(CharacterService.validateName("Valid_Name")).toEqual([]);
      expect(CharacterService.validateName("A_B_C")).toEqual([]);
    });

    it("should reject names that are too short", () => {
      const errors = CharacterService.validateName("ABC");
      expect(errors).toContain("Name must be between 4 and 15 characters long");
    });

    it("should reject names that are too long", () => {
      const errors = CharacterService.validateName("ThisNameIsTooLong");
      expect(errors).toContain("Name must be between 4 and 15 characters long");
    });

    it("should reject names with invalid characters", () => {
      const errors = CharacterService.validateName("Name123");
      expect(errors).toContain(
        "Name must contain only letters and underscores"
      );
    });

    it("should reject empty names", () => {
      const errors = CharacterService.validateName("");
      expect(errors).toContain("Name must be between 4 and 15 characters long");
    });
  });

  describe("validateJob", () => {
    it("should accept valid jobs", () => {
      expect(CharacterService.validateJob("WARRIOR")).toEqual([]);
      expect(CharacterService.validateJob("THIEF")).toEqual([]);
      expect(CharacterService.validateJob("MAGE")).toEqual([]);
    });

    it("should reject invalid jobs", () => {
      const errors = CharacterService.validateJob("INVALID");
      expect(errors).toContain("Job must be one of: Warrior, Thief, or Mage");
    });
  });

  describe("calculateModifiers", () => {
    it("should calculate Warrior modifiers correctly", () => {
      const modifiers = CharacterService.calculateModifiers(
        Job.WARRIOR,
        10,
        5,
        5
      );
      expect(modifiers.attackModifier).toBe(8.5); // 0.8 * 10 + 0.2 * 5
      expect(modifiers.speedModifier).toBe(4); // 0.6 * 5 + 0.2 * 5
    });

    it("should calculate Thief modifiers correctly", () => {
      const modifiers = CharacterService.calculateModifiers(
        Job.THIEF,
        4,
        10,
        4
      );
      expect(modifiers.attackModifier).toBe(11); // 0.25 * 4 + 1.0 * 10 + 0.25 * 4
      expect(modifiers.speedModifier).toBe(8); // 0.8 * 10
    });

    it("should calculate Mage modifiers correctly", () => {
      const modifiers = CharacterService.calculateModifiers(Job.MAGE, 5, 6, 10);
      expect(modifiers.attackModifier).toBe(13.2); // 0.2 * 5 + 0.2 * 6 + 1.2 * 10
      expect(modifiers.speedModifier).toBe(2.9); // 0.4 * 6 + 0.1 * 5
    });
  });

  describe("createCharacter", () => {
    it("should create a valid Warrior character", () => {
      const input: CreateCharacterInput = {
        name: "TestWarrior",
        job: Job.WARRIOR,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(true);
      expect(result.character).toBeDefined();
      expect(result.character!.name).toBe("TestWarrior");
      expect(result.character!.job).toBe(Job.WARRIOR);
      expect(result.character!.healthPoints).toBe(20);
      expect(result.character!.strength).toBe(10);
      expect(result.character!.dexterity).toBe(5);
      expect(result.character!.intelligence).toBe(5);
      expect(result.character!.attackModifier).toBe(8.5);
      expect(result.character!.speedModifier).toBe(4);
      expect(result.errors).toEqual([]);
    });

    it("should create a valid Thief character", () => {
      const input: CreateCharacterInput = {
        name: "TestThief",
        job: Job.THIEF,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(true);
      expect(result.character).toBeDefined();
      expect(result.character!.name).toBe("TestThief");
      expect(result.character!.job).toBe(Job.THIEF);
      expect(result.character!.healthPoints).toBe(15);
      expect(result.character!.strength).toBe(4);
      expect(result.character!.dexterity).toBe(10);
      expect(result.character!.intelligence).toBe(4);
      expect(result.character!.attackModifier).toBe(11);
      expect(result.character!.speedModifier).toBe(8);
    });

    it("should create a valid Mage character", () => {
      const input: CreateCharacterInput = {
        name: "TestMage",
        job: Job.MAGE,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(true);
      expect(result.character).toBeDefined();
      expect(result.character!.name).toBe("TestMage");
      expect(result.character!.job).toBe(Job.MAGE);
      expect(result.character!.healthPoints).toBe(12);
      expect(result.character!.strength).toBe(5);
      expect(result.character!.dexterity).toBe(6);
      expect(result.character!.intelligence).toBe(10);
      expect(result.character!.attackModifier).toBe(13.2);
      expect(result.character!.speedModifier).toBe(2.9);
    });

    it("should reject character with invalid name", () => {
      const input: CreateCharacterInput = {
        name: "AB", // Too short
        job: Job.WARRIOR,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(false);
      expect(result.character).toBeUndefined();
      expect(result.errors).toContain(
        "Name must be between 4 and 15 characters long"
      );
    });

    it("should reject character with invalid job", () => {
      const input: CreateCharacterInput = {
        name: "ValidName",
        job: "INVALID" as Job,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(false);
      expect(result.character).toBeUndefined();
      expect(result.errors).toContain(
        "Job must be one of: Warrior, Thief, or Mage"
      );
    });

    it("should reject character with multiple validation errors", () => {
      const input: CreateCharacterInput = {
        name: "AB", // Too short
        job: "INVALID" as Job,
      };

      const result = CharacterService.createCharacter(input);

      expect(result.success).toBe(false);
      expect(result.character).toBeUndefined();
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain(
        "Name must be between 4 and 15 characters long"
      );
      expect(result.errors).toContain(
        "Job must be one of: Warrior, Thief, or Mage"
      );
    });
  });

  describe("getAllCharacters", () => {
    it("should return empty array when no characters exist", () => {
      expect(CharacterService.getAllCharacters()).toEqual([]);
    });

    it("should return all created characters", () => {
      CharacterService.createCharacter({ name: "Char1", job: Job.WARRIOR });
      CharacterService.createCharacter({ name: "Char2", job: Job.THIEF });

      const characters = CharacterService.getAllCharacters();
      expect(characters).toHaveLength(2);
      expect(characters[0].name).toBe("Char1");
      expect(characters[1].name).toBe("Char2");
    });
  });

  describe("getCharacterById", () => {
    it("should return undefined for non-existent character", () => {
      expect(CharacterService.getCharacterById("999")).toBeUndefined();
    });

    it("should return character by id", () => {
      const result = CharacterService.createCharacter({
        name: "TestChar",
        job: Job.WARRIOR,
      });
      const character = CharacterService.getCharacterById(result.character!.id);

      expect(character).toBeDefined();
      expect(character!.name).toBe("TestChar");
    });
  });
});

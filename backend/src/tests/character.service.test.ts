import { createCharacter } from "../services/character.service";
import { Job } from "../models/character";

describe("createCharacter", () => {
  it("creates a Warrior with correct stats", () => {
    const result = createCharacter("HeroName", Job.Warrior);
    expect(result.success).toBe(true);
    expect(result.character).toBeDefined();
    expect(result.character?.name).toBe("HeroName");
    expect(result.character?.job).toBe(Job.Warrior);
    expect(result.character?.health).toBe(20);
    expect(result.character?.strength).toBe(10);
    expect(result.character?.dexterity).toBe(5);
    expect(result.character?.intelligence).toBe(5);
  });

  it("creates a Thief with correct stats", () => {
    const result = createCharacter("Sneaky", Job.Thief);
    expect(result.success).toBe(true);
    expect(result.character).toBeDefined();
    expect(result.character?.name).toBe("Sneaky");
    expect(result.character?.job).toBe(Job.Thief);
    expect(result.character?.health).toBe(15);
    expect(result.character?.strength).toBe(4);
    expect(result.character?.dexterity).toBe(10);
    expect(result.character?.intelligence).toBe(4);
  });

  it("creates a Mage with correct stats", () => {
    const result = createCharacter("Wizard", Job.Mage);
    expect(result.success).toBe(true);
    expect(result.character).toBeDefined();
    expect(result.character?.name).toBe("Wizard");
    expect(result.character?.job).toBe(Job.Mage);
    expect(result.character?.health).toBe(12);
    expect(result.character?.strength).toBe(5);
    expect(result.character?.dexterity).toBe(6);
    expect(result.character?.intelligence).toBe(10);
  });
});

describe("validation errors", () => {
  it("returns error for name too short", () => {
    const result = createCharacter("abc", Job.Warrior);
    expect(result.success).toBe(false);
    expect(result.errors).toContain(
      "Name must be between 4 and 15 characters long"
    );
  });

  it("returns error for name with invalid characters", () => {
    const result = createCharacter("Name123", Job.Warrior);
    expect(result.success).toBe(false);
    expect(result.errors).toContain(
      "Name must contain only letters and underscores"
    );
  });

  it("returns error for invalid job", () => {
    const result = createCharacter("ValidName", "InvalidJob");
    expect(result.success).toBe(false);
    expect(result.errors).toContain(
      "Job must be one of: Warrior, Thief, or Mage"
    );
  });
});

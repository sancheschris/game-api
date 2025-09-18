import { validateJob, validateName } from "./validation";

describe("validateName", () => {
  it("accepts valid names", () => {
    expect(validateName("SuperWarrior")).toEqual([]);
    expect(validateName("Super_Warrior")).toEqual([]);
  });

  it("returns error when names are too short", () => {
    expect(validateName("apu")).toContain(
      "Name must be between 4 and 15 characters long"
    );
  });

  it("returns error when names are too long", () => {
    expect(validateName("ThisSuperHeroHasALongName")).toContain("Name must be between 4 and 15 characters long");
  });

  it("return errors when name is invalid", () => {
    expect(validateName("Batman254")).toContain("Name must contain only letters and underscores");
    expect(validateName("Tibiano@20")).toContain("Name must contain only letters and underscores");
  })
});

describe("validateJob", () => {
  it("accepts valid jobs", () => {
    expect(validateJob("Warrior")).toEqual([]);
    expect(validateJob("Thief")).toEqual([]);
    expect(validateJob("Mage")).toEqual([]);
  });

  it("rejects invalid jobs", () => {
    expect(validateJob("Druid")).toContain("Job must be one of: Warrior, Thief, or Mage");
    expect(validateJob("")).toContain("Job must be one of: Warrior, Thief, or Mage");
  });
});

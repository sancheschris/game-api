import { Job } from "../models/character";

export const validateName = (name: string): string[] => {
  const errors: string[] = [];
  if (name.length < 4 || name.length > 15) {
    errors.push("Name must be between 4 and 15 characters long");
  }
  if (!/^[_a-zA-Z]+$/.test(name)) {
    errors.push("Name must contain only letters and underscores");
  }
  return errors;
};


export const validateJob = (job: string): string[] => {
    const allowedJobs = Object.values(Job);
    if (!allowedJobs.includes(job as Job)) {
        return ["Job must be one of: Warrior, Thief, or Mage"];
    }
    return [];
};
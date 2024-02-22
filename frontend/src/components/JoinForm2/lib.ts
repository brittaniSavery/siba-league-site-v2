import type { ProTeam, School } from "@lib/types";

export const FOUND_BY = [
  { id: "devs", label: "Wolverine Studios Forums" },
  { id: "ref", label: "Family/Friends" },
  { id: "youtube", label: "YouTube" },
  { id: "google", label: "Google" },
  { id: "twitter", label: "Twitter" },
  { id: "other", label: "Other" },
] as const;

export const PRO_TEMPER = [
  "terrible",
  "poor",
  "normal",
  "good",
  "great",
] as const;

export const LOW_HIGH = [
  "very low",
  "low",
  "average",
  "high",
  "very high",
] as const;

type LowHighType = typeof LOW_HIGH[number];

export type NewMember = {
  name: string;
  email: string;
  found: typeof FOUND_BY[number]["id"];
  reason?: string;
};

export type CreatedPlayer = {
  firstName: string;
  lastName: string;
  face: number;
  clothes: number;
  age: number;
  gender?: "male" | "female";
  password: string;
};

export type ProForm = CreatedPlayer & {
  temper: typeof PRO_TEMPER[number];
  greed: LowHighType;
  team: ProTeam;
  offense: number;
  defense: number;
  potential: number;
  playerDev: number;
  bballIQ: number;
};

export type CollegeForm = CreatedPlayer & {
  team: School;
  ambition: LowHighType;
  academics: LowHighType;
  discipline: LowHighType;
  integrity: LowHighType;
  temper: LowHighType;
  offense: number;
  defense: number;
  scouting: number;
  recruiting: number;
  playerDev: number;
};

export type MainForm = NewMember & {
  teams: {
    pro?: ProForm;
    college?: CollegeForm[];
  };
};

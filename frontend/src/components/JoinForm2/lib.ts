import type { ProTeam, School } from "@lib/types";

const FOUND_BY = [
  { id: "devs", label: "Wolverine Studios Forums" },
  { id: "ref", label: "Family/Friends" },
  { id: "youtube", label: "YouTube" },
  { id: "google", label: "Google" },
  { id: "twitter", label: "Twitter" },
  { id: "other", label: "Other" },
] as const;

const PRO_TEMPER = ["terrible", "poor", "normal", "good", "great"] as const;
const LOW_HIGH = ["very low", "low", "average", "high", "very high"] as const;

type FoundByIds = typeof FOUND_BY[number]["id"];
type ProTemperIds = typeof PRO_TEMPER[number];
type LowHighIds = typeof LOW_HIGH[number];

export type NewMember = {
  name: string;
  email: string;
  found: FoundByIds;
  reason?: string;
};

export type CreatedPlayer = {
  firstName: string;
  lastName: string;
  face: number;
  clothes: number;
  age: number;
  gender?: "male" | "female";
};

export type ProForm = CreatedPlayer & {
  temper: ProTemperIds;
  greed: LowHighIds;
  team: ProTeam;
  offense: number;
  defense: number;
  potential: number;
  playerDev: number;
  bballIQ: number;
};

export type CollegeForm = CreatedPlayer & {
  team: School;
  ambition: LowHighIds;
  academics: LowHighIds;
  discipline: LowHighIds;
  integrity: LowHighIds;
  temper: LowHighIds;
  offense: number;
  defense: number;
  scouting: number;
  recruiting: number;
  playerDev: number;
};

export type MainForm = NewMember & {
  pro?: ProForm;
  college?: CollegeForm[];
};

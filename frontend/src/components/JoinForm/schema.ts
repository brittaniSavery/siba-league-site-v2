import {
  COLLEGE_LEAGUE_INFO,
  LEAGUE,
  PRO_LEAGUE_INFO,
} from "@content/constants";
import type { ProTeam, School } from "@lib/types";
import Joi from "joi";

export const FOUND_CHOICES = [
  { name: "developers", label: "Wolverine Studios Forums" },
  { name: "referral", label: "Family/Friend" },
  { name: "google", label: "Google" },
  { name: "twitter", label: "Twitter" },
  { name: "other", label: "Other" },
];

export const PRO_PERSONALITY = ["Terrible", "Low", "Average", "High", "Great"];
export const LOW_HIGH_LEVELS = [
  "Very Low",
  "Low",
  "Average",
  "High",
  "Very High",
];

type SharedFields = {
  password: string;
  firstName: string;
  lastName: string;
  picture: number;
  outfit: number;
  age: number;
  offense: number;
  defense: number;
  playerDev: number;
  currentPointsTotal: number;
};

export type ProTeamForm = SharedFields & {
  team: ProTeam | null;
  personality: string;
  greed: string;
  potential: number;
  gameStrategy: number;
};

export type CollegeTeamForm = SharedFields & {
  team: School | null;
  ambition: string;
  academics: string;
  discipline: string;
  integrity: string;
  temper: string;
  recruiting: number;
  scouting: number;
};

export type JoinForm = {
  name: string;
  email: string;
  found: "developers" | "referral" | "google" | "twitter" | "other";
  reason?: string;
  proTeam?: ProTeamForm;
  collegeTeams?: CollegeTeamForm[];
};

const pointsValidation = (league: LEAGUE, tier?: 1 | 2 | 3) => {
  let apm;
  if (league === LEAGUE.college && tier)
    apm = COLLEGE_LEAGUE_INFO.pointLimits[tier];
  else apm = PRO_LEAGUE_INFO.pointLimits;

  return Joi.number().min(apm.min).max(apm.max).required();
};

const sharedFieldsValidation = {
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  picture: Joi.number().min(1).required(),
  outfit: Joi.number().min(1).required(),
  age: Joi.number().min(25).max(75).required(),
};

const proTeamValidation = {
  team: Joi.object().empty(null).required(),
  personality: Joi.valid(...Object.keys(PRO_PERSONALITY)).required(),
  greed: Joi.valid(...Object.keys(LOW_HIGH_LEVELS)).required(),
  offense: pointsValidation(LEAGUE.pro),
  defense: pointsValidation(LEAGUE.pro),
  potential: pointsValidation(LEAGUE.pro),
  gameStrategy: pointsValidation(LEAGUE.pro),
  playerDev: pointsValidation(LEAGUE.pro),
  currentTotal: Joi.number().max(PRO_LEAGUE_INFO.pointLimits.total).required(),
};

const collegeValidation = {
  // TODO
};

export const proTeamFormSchema: Joi.Schema<ProTeamForm> = Joi.object({
  ...sharedFieldsValidation,
  ...proTeamValidation,
}).unknown();

export const joinFormSchema: Joi.Schema<JoinForm> = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Please enter your name. First name is okay.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "Please enter your email address.",
      "string.email":
        "This email is not valid. Be sure to double check for typos.",
    }),
  found: Joi.string()
    .valid(...FOUND_CHOICES.map((choice) => choice.name))
    .messages({
      "any.only":
        "Please select how your found the league. Best guess is okay if you don't remember.",
    }),
  reason: Joi.string()
    .empty("")
    .when("found", {
      is: "other",
      then: Joi.string().required().min(15),
    })
    .messages({
      "any.required":
        "Please detail how you found the league. Just a few words is fine.",
      "string.min":
        "Please detail how you found the league. Just a few words is fine.",
    }),
});

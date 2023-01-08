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
  gender: "male" | "female";
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
  age: Joi.number().min(25).max(75).required(),
  gender: Joi.valid("male", "female").required(),
  picture: Joi.number()
    .required()
    .when("gender", [
      { is: "male", then: Joi.number().min(1).max(179) },
      { is: "female", then: Joi.number().min(1000).max(1022) },
    ]),
  outfit: Joi.number()
    .required()
    .when("gender", [
      { is: "male", then: Joi.number().min(1).max(55) },
      { is: "female", then: Joi.number().min(1000).max(1006) },
    ]),
};

const proTeamValidation = {
  team: Joi.object().empty(null).required(),
  personality: Joi.valid(...PRO_PERSONALITY).required(),
  greed: Joi.valid(...LOW_HIGH_LEVELS).required(),
  offense: pointsValidation(LEAGUE.pro),
  defense: pointsValidation(LEAGUE.pro),
  potential: pointsValidation(LEAGUE.pro),
  gameStrategy: pointsValidation(LEAGUE.pro),
  playerDev: pointsValidation(LEAGUE.pro),
  currentPointsTotal: Joi.number()
    .max(PRO_LEAGUE_INFO.pointLimits.total)
    .required(),
};

const collegePointsValidation = Joi.number().when("team.tier", [
  {
    is: 1,
    then: pointsValidation(LEAGUE.college, 1),
  },
  {
    is: 2,
    then: pointsValidation(LEAGUE.college, 2),
  },
  {
    is: 3,
    then: pointsValidation(LEAGUE.college, 3),
  },
]);

const collegeValidation = {
  team: Joi.object({
    tier: Joi.number().min(1).max(3),
  })
    .unknown()
    .required(),
  ambition: Joi.valid(...LOW_HIGH_LEVELS).required(),
  academics: Joi.valid(...LOW_HIGH_LEVELS).required(),
  discipline: Joi.valid(...LOW_HIGH_LEVELS).required(),
  integrity: Joi.valid(...LOW_HIGH_LEVELS).required(),
  temper: Joi.valid(...LOW_HIGH_LEVELS).required(),
  offense: collegePointsValidation,
  defense: collegePointsValidation,
  recruiting: collegePointsValidation,
  scouting: collegePointsValidation,
  playerDev: collegePointsValidation,
  currentPointsTotal: Joi.number().when("team.tier", [
    {
      is: 1,
      then: Joi.number()
        .max(COLLEGE_LEAGUE_INFO.pointLimits[1].total)
        .required(),
    },
    {
      is: 2,
      then: Joi.number()
        .max(COLLEGE_LEAGUE_INFO.pointLimits[2].total)
        .required(),
    },
    {
      is: 3,
      then: Joi.number()
        .max(COLLEGE_LEAGUE_INFO.pointLimits[3].total)
        .required(),
    },
  ]),
};

export const proTeamFormSchema: Joi.Schema<ProTeamForm> = Joi.object({
  ...sharedFieldsValidation,
  ...proTeamValidation,
}).unknown();

export const collegeTeamFormSchema: Joi.Schema<CollegeTeamForm> = Joi.object({
  ...sharedFieldsValidation,
  ...collegeValidation,
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
  proTeam: Joi.object()
    .when("collegeTeams", {
      not: Joi.exist(),
      then: Joi.object().required(),
    })
    .messages({
      "any.required": "At least one team (either pro or college) is required.",
    }),
  collegeTeams: Joi.array()
    .items(
      Joi.object({
        tier: Joi.number(),
        region: Joi.string(),
      }).unknown()
    )
    .max(3)
    .unique((a, b) => {
      const aTeam = a.team;
      const bTeam = b.team;
      return aTeam.tier === bTeam.tier || aTeam.region === bTeam.region;
    })
    .messages({
      "any.unique":
        "Schools cannot share a ranking tier or a recruiting region.",
    }),
}).unknown();

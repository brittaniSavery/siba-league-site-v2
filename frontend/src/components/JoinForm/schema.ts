import {
  COLLEGE_LEAGUE_INFO,
  LEAGUE,
  PRO_LEAGUE_INFO,
} from "@content/constants";
import Joi from "joi";

export const FOUND_CHOICES = [
  { name: "developers", label: "Wolverine Studios Forums" },
  { name: "referral", label: "Family/Friend" },
  { name: "google", label: "Google" },
  { name: "twitter", label: "Twitter" },
  { name: "other", label: "Other" },
];

export enum PRO_PERSONALITY {
  Terrible = "Terrible",
  Low = "Low",
  Average = "Average",
  High = "High",
  Great = "Great",
}

export enum LOW_HIGH_LEVELS {
  VeryLow = "Very Low",
  Low = "Low",
  Average = "Average",
  High = "High",
  VeryHigh = "Very High",
}

type Basics = {
  teamName: string;
  teamPassword: string;
  memberFirstName: string;
  memberLastName: string;
  memberPicture: number;
  memberOutfit: number;
  memberAge: number;
  offense: number;
  defense: number;
  playerDev: number;
  pointSum: number;
};

export type FormProTeam = Basics & {
  memberPersonality: PRO_PERSONALITY;
  memberGreed: LOW_HIGH_LEVELS;
  potential: number;
};

export type FormCollegeTeam = Basics & {
  memberAmbition: LOW_HIGH_LEVELS;
  memberAcademics: LOW_HIGH_LEVELS;
  memberDiscipline: LOW_HIGH_LEVELS;
  memberIntegrity: LOW_HIGH_LEVELS;
  memberTemper: LOW_HIGH_LEVELS;
};

export type JoinSchema = {
  name: string;
  email: string;
  found: "developers" | "referral" | "google" | "twitter" | "other";
  reason?: string;
  proTeam?: FormProTeam;
  collegeTeams?: FormCollegeTeam[];
};

const teamBasicValidation = {
  team: Joi.required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  picture: Joi.number().min(1).required(),
  outfit: Joi.number().min(1).required(),
  age: Joi.number().min(25).max(75).required(),
};

const pointsValidation = (league: LEAGUE, tier?: 1 | 2 | 3) => {
  let apm;
  if (league === LEAGUE.college && tier)
    apm = COLLEGE_LEAGUE_INFO.allowedPointsMax[tier];
  else apm = PRO_LEAGUE_INFO.allowedPointsMax;

  return Joi.number().min(apm.min).max(apm.max).required();
};

const proTeamValidation = {
  personality: Joi.valid(...Object.keys(PRO_PERSONALITY)).required(),
  greed: Joi.valid(...Object.keys(LOW_HIGH_LEVELS)).required(),
  offense: pointsValidation(LEAGUE.pro),
  defense: pointsValidation(LEAGUE.pro),
  potential: pointsValidation(LEAGUE.pro),
  gameStrategy: pointsValidation(LEAGUE.pro),
  playerDev: pointsValidation(LEAGUE.pro),
  // pointsSum: Joi.number()
  //   .max(PRO_LEAGUE_INFO.allowedPointsMax.total)
  //   .required(),
};

export const proTeamValidationSchema: Joi.Schema<FormProTeam> = Joi.object({
  ...teamBasicValidation,
  ...proTeamValidation,
})
  .custom((parent) => {
    const { offense, defense, potential, gameStrategy, playerDev } = parent;
    const sum = offense + defense + potential + gameStrategy + playerDev;

    if (sum > 325)
      throw new Error("Ability Points Sum cannot be more than 325.");
  })
  .unknown();

export const joinValidationSchema: Joi.Schema<JoinSchema> = Joi.object({
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

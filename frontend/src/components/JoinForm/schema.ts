import Joi from "joi";

export const FoundChoices = [
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
};

type ProTeam = Basics & {
  memberPersonality: PRO_PERSONALITY;
  memberGreed: LOW_HIGH_LEVELS;
  potential: number;
};

type CollegeTeam = Basics & {
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
  proTeam?: ProTeam;
  collegeTeams?: CollegeTeam[];
};

export const proTeamValidation: Joi.Schema<ProTeam> = Joi.object({});

export const joinValidation: Joi.Schema<JoinSchema> = Joi.object({
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
    .valid(...FoundChoices.map((choice) => choice.name))
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

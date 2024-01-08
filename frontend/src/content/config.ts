import { z, defineCollection } from "astro:content";

const pointLimit = z.object({
  min: z.number(),
  max: z.number(),
  total: z.number(),
});

const league = defineCollection({
  type: "data",
  schema: z.object({
    type: z.string(),
    longType: z.string(),
    extension: z.string(),
    name: z.string(),
    longName: z.string(),
    color: z.string(),
    sims: z.string(),
    slack: z.string(),
    discord: z.string(),
    version: z.number(),
    listTitle: z.string(),
    strapiMembers: z.string(),
    singleMember: z.string(),
    pointLimits: z.union([
      pointLimit,
      z.object({ 1: pointLimit, 2: pointLimit, 3: pointLimit }),
    ]),
  }),
});

const calendar = defineCollection({
  type: "data",
  schema: z.object({
    legend: z.array(
      z.object({
        type: z.string(),
        label: z.string().optional(),
        details: z.array(z.string()).optional(),
      })
    ),
    events: z.array(
      z.object({
        type: z.string(),
        name: z.string().optional(),
        start: z.string().transform((str) => new Date(str)),
        end: z
          .string()
          .transform((str) => new Date(str))
          .optional(),
      })
    ),
  }),
});

export const collections = {
  league: league,
  calendar: calendar,
};

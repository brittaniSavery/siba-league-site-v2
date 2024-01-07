import { z, defineCollection } from "astro:content";

const pointLimit = z.object({
  min: z.number(),
  max: z.number(),
  total: z.number(),
});

const leagueInfo = defineCollection({
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

export const collections = {
  leagueInfo: leagueInfo,
};

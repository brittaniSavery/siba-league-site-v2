import type { ReactNode } from "react";
import type { LEAGUE, LOW_TO_HIGH, PRO_PERSONALITY } from "@lib/constants";

//#region GENERAL TYPES
export type ChildrenProps = {
  children?: ReactNode;
};

export type StrapiObject<T> = {
  id: number;
  attributes: T & { createdAt: Date; updatedAt: Date; publishedAt?: Date };
};

export type StrapiCollectionResponse<T> = {
  data: [StrapiObject<T>];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiSingleTypeResponse<T> = {
  data: StrapiObject<T>;
};

export type StrapiTeamInfo = {
  teams: Team[];
};

export type StrapiProInfo = {
  teams: ProTeam[];
};

export type StrapiCollegeInfo = {
  teams: School[];
};

export type SiteUpdate = {
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Member = {
  team: string;
  logo: string;
  name: string;
};

export type Team = {
  id: number;
  name: string;
  mascot: string;
};

export type HumanTeam = {
  team: string;
  id?: number;
  member?: string;
};

export type ProTeam = Team & {
  points: number;
  luxury_tax: number;
};

export type School = Team & {
  ranking: number;
  tier: 1 | 2 | 3;
  region: string;
  conference: string;
};

export type Schools = {
  data: School[];
  updatedAt: Date;
};

export type Conference = {
  file: string;
  title: string;
  img?: string;
};

export type AbilityPoint = {
  key: string;
  label: {
    pro?: string;
    college?: string;
  };
};

type PointLimit = {
  min: number;
  max: number;
  total: number;
};

export type LeagueInfo = {
  name: string;
  abbv: string;
  type: LEAGUE;
  typeAbbv: string;
  typeFull: string;
  link: string;
  simDays: string;
  channel: string;
  version: number;
  color: string;
  pageTitle: string;
  strapiMembers: string;
  singleMember: string;
  pointLimits: PointLimit | { 1: PointLimit; 2: PointLimit; 3: PointLimit };
  pointLabels: AbilityPoint[];
  pictureFolder: string;
};

//#region JOIN TYPES

type ProPersonality = (typeof PRO_PERSONALITY)[number];
type LowToHigh = (typeof LOW_TO_HIGH)[number];

export type NewTeam = {
  firstName: string;
  lastName: string;
  age: number;
  face: number;
  outfit: number;
  offense: number;
  defense: number;
  playerDev: number;
};

export type NewProTeam = NewTeam & {
  team: ProTeam;
  gender: "male" | "female";
  personality: ProPersonality;
  greed: LowToHigh;
  potential: number;
  gameStrategy: number;
};

export type NewCollegeTeam = NewTeam & {
  team: School;
  ambition: LowToHigh;
  academics: LowToHigh;
  discipline: LowToHigh;
  integrity: LowToHigh;
  temper: LowToHigh;
  recruiting: number;
  scouting: number;
};

//#endregion

//#endregion

//#region ARTICLE TYPES

export type Article = {
  author: { data: StrapiObject<Author> };
  content: string;
  image: {
    data: StrapiObject<
      Picture & {
        formats: {
          thumbnail: Picture;
        };
      }
    >;
  };
  league: "pro" | "college";
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  tags: {
    data: [StrapiObject<Tag>];
  };
  updatedAt: string;
};

export type Picture = {
  url: string;
  alternativeText: string;
};

export type Author = {
  name: string;
  url: string;
  picture: { data: StrapiObject<Picture> };
};

export type Tag = {
  name: string;
};
//#endregion

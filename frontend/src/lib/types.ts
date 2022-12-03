import type { ReactNode } from "react";
import type { LEAGUE, TOURNAMENT_TYPE } from "@content/constants";
import type { Event } from "react-big-calendar";

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

export type StrapiSimInfo = {
  proCurrentDate: Date;
  collegeCurrentDate: Date;
};

export type StrapiProInfo = {
  teams: ProTeam[];
};

export type StrapiCollegeInfo = {
  schools: School[];
};

export type LeagueInfo = {
  name: string;
  abbv: string;
  type: LEAGUE;
  typeAbbv: string;
  typeFull: string;
  simDays: string;
  channel: string;
  version: number;
  color: string;
};

export type SiteUpdate = {
  content: string;
  publishedAt: string;
};

export type ProTeam = {
  name: string;
  mascot: string;
  points: number;
};

export type Member = {
  team: string;
  logo: string;
  name: string;
};

export type School = {
  ranking: number;
  tier: 1 | 2 | 3;
  name: string;
  mascot: string;
  region: string;
  probation: "";
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

//#endregion

//#region CALENDAR TYPES

export type CollegeEvent = Event & {
  tournament?: boolean;
  tournamentType?: TOURNAMENT_TYPE;
};

export type ProEvent = Event & {
  league: LEAGUE;
};

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

import { ReactNode } from "react";
import { LEAGUE, TOURNAMENT_TYPE } from "src/content/constants";

//#region GENERAL TYPES
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _paq?: any;
  }
}

type ChildrenProps = {
  children?: ReactNode;
};

type SiteUpdate = {
  content: string;
  published_at: string;
};

type Member = {
  team: string;
  logo: string;
  name: string;
};

type School = {
  ranking: number;
  tier: 1 | 2 | 3;
  name: string;
  mascot: string;
  region: string;
  probation: "";
};

type Schools = {
  data: School[];
  updatedAt: Date;
};

//#endregion

//#region CALENDAR TYPES

type SibaEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type CollegeEvent = SibaEvent & {
  tournament?: boolean;
  tournamentType?: TOURNAMENT_TYPE;
};

type ProEvent = SibaEvent & {
  league: LEAGUE;
};

type RewardPoints = {
  data: { team: string; points: number }[];
  updatedAt: Date;
};
//#endregion

//#region ARTICLE TYPES

type Article = {
  author: Author;
  content: string;
  image: Picture & {
    formats: {
      thumbnail: Picture;
    };
  };
  league: "pro" | "college";
  published_at: string;
  slug: string;
  summary: string;
  title: string;
  tags: Tag[];
  updatedAt: string;
};

type Picture = {
  url: string;
  alternativeText: string;
};

type Author = {
  name: string;
  url: string;
  picture: Picture;
};

type Tag = {
  name: string;
};
//#endregion

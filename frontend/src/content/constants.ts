import type { Conference } from "@lib/types";

export enum RECRUITING {
  None = "No Recruiting",
  Quiet = "Quiet",
  Evaluation = "Evaluation",
  Dead = "Dead",
  Contact = "Contact",
  EarlyLOI = "Early LOI Signings",
  LateLOI = "Late LOI Signings",
}

export enum LEAGUE {
  pro = "pro",
  development = "development",
  european = "european",
  college = "college",
}

export enum TOURNAMENT_TYPE {
  preseason,
  postseason,
}

export const enum MONTHS {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export const PRO_LEAGUE_INFO = {
  name: "Simulation Internet Professional Basketball",
  abbv: "SIBA",
  type: LEAGUE.pro,
  typeAbbv: "PB",
  typeFull: "professional",
  simDays: "Monday, Wednesday, and Friday",
  channel: "siba-league-news",
  version: 10.11,
  color: "orange",
  members: "Owners",
  strapiMembers: "general-managers",
};

export const COLLEGE_LEAGUE_INFO = {
  name: "Simulation Internet College Basketball",
  abbv: "SICBA",
  type: LEAGUE.college,
  typeAbbv: "CB",
  typeFull: "college",
  simDays: "Tuesday, Thursday, and Saturday",
  channel: "sicba-news",
  version: 9.7,
  color: "blue",
  members: "Head Coaches",
  strapiMembers: "coaches",
};

export const CONFERENCES: Record<string, Conference> = {
  "a-sun": { file: "A-Sun", title: "Atlantic Sun Conference" },
  a10: { file: "A10", title: "Atlantic 10 Conference" },
  aac: { file: "AAC", title: "American Athletic Conference" },
  acc: { file: "ACC", title: "Atlantic Coast Conference" },
  "america-east": { file: "America East", title: "America East Conference" },
  "big-10": { file: "Big 10", title: "Big 10 Conference" },
  "big-12": { file: "Big 12", title: "Big 12 Conference" },
  "big-east": { file: "Big East", title: "Big East Conference" },
  "big-sky": { file: "Big Sky", title: "Big Sky Conference" },
  "big-south": { file: "Big South", title: "Big South Conference" },
  "big-west": { file: "Big West", title: "Big West Conference" },
  "c-usa": { file: "C-USA", title: "Conference USA" },
  caa: { file: "CAA", title: "Colonial Athletic Association" },
  horizon: { file: "Horizon", title: "Horizon League" },
  "ivy-league": { file: "Ivy League", title: "Ivy League", img: "ivy" },
  maac: { file: "MAAC", title: "Metro Atlantic Athletic Conference" },
  mac: { file: "MAC", title: "Mid-American Conference" },
  meac: { file: "MEAC", title: "Mid-Eastern Athletic Conference" },
  mvc: { file: "MVC", title: "Missouri Valley Conference" },
  mwc: { file: "MWC", title: "Mountain West Conference" },
  northeast: { file: "Northeast", title: "Northeast Conference", img: "nec" },
  ovc: { file: "OVC", title: "Ohio Valley Conference" },
  "pac-12": { file: "PAC 12", title: "PAC-12 Conference" },
  "patriot-league": {
    file: "Patriot League",
    title: "Patriot League",
    img: "patriot",
  },
  sec: { file: "SEC", title: "Southeastern Conference" },
  socon: { file: "SOCON", title: "Southern Conference" },
  swac: { file: "SWAC", title: "Southwestern Athletic Conference" },
  southland: { file: "Southland", title: "Southland Conference" },
  summit: { file: "Summit", title: "Summit League" },
  "sun-belt": { file: "Sun Belt", title: "Sun Belt Conference" },
  wac: { file: "WAC", title: "Western Athletic Conference" },
  wcc: { file: "WCC", title: "West Coast Conference" },
};

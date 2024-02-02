import { LEAGUE, MONTHS } from "@lib/constants";
import type { SibaEvent } from "@lib/types";

const recruiting = {
  none: { type: "none", title: "No Recruiting" },
  quiet: { type: "quiet", title: "Quiet" },
  eval: { type: "evaluation", title: "Evaluation" },
  dead: { type: "dead", title: "Dead" },
  contact: { type: "contact", title: "Contact" },
  early: { type: "loi", title: "Early LOI Signings" },
  late: { type: "loi", title: "Early LOI Signings" },
};

export const proEvents: SibaEvent[] = [
  //#region Pro League
  {
    title: "D-League Assignments",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 4),
    end: new Date(2022, MONTHS.Oct, 4),
  },
  {
    title: "Regular Season Begins",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 17),
    end: new Date(2022, MONTHS.Oct, 17),
  },
  {
    title: "Trade Deadline",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Feb, 8),
    end: new Date(2022, MONTHS.Feb, 8),
  },
  {
    title: "All-Star Weekend",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Feb, 16),
    end: new Date(2022, MONTHS.Feb, 18),
  },
  {
    title: "Playoff Rosters Finalized",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Apr, 12),
    end: new Date(2022, MONTHS.Apr, 12),
  },
  {
    title: "Playoffs Begins",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Apr, 14),
    end: new Date(2022, MONTHS.Apr, 14),
  },
  {
    title: "Draft Lottery",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 7),
    end: new Date(2022, MONTHS.Jun, 7),
  },
  {
    title: "1st Meeting with Owner",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 18),
    end: new Date(2022, MONTHS.Jun, 18),
  },
  {
    title: "GM Job Hiring",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 19),
    end: new Date(2022, MONTHS.Jun, 19),
  },
  {
    title: "2nd Meeting with Owner",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 20),
    end: new Date(2022, MONTHS.Jun, 20),
  },
  {
    title: "Coach Hiring",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 21),
    end: new Date(2022, MONTHS.Jun, 24),
  },
  {
    title: "Rookie Combine",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 26),
    end: new Date(2022, MONTHS.Jun, 26),
  },
  {
    title: "Team Workouts for Rookies",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 27),
    end: new Date(2022, MONTHS.Jun, 27),
  },
  {
    title: "College Draft",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 28),
    end: new Date(2022, MONTHS.Jun, 28),
  },
  {
    title: "Contract Deadlines",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 30),
    end: new Date(2022, MONTHS.Jun, 30),
  },
  {
    title: "Summer League Rosters Set",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 2),
    end: new Date(2022, MONTHS.Jul, 2),
  },
  {
    title: "Summer League Play",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 3),
    end: new Date(2022, MONTHS.Jul, 15),
  },
  {
    title: "Free Agency",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 16),
    end: new Date(2022, MONTHS.Aug, 4),
  },
  {
    title: "Deadline to Sign 2nd Round Picks",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Aug, 4),
    end: new Date(2022, MONTHS.Aug, 4),
  },
  {
    title: "Deadline for Rookie Options",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Sep, 30),
    end: new Date(2022, MONTHS.Sep, 4),
  },
  {
    title: "Training Camp",
    type: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 3),
    end: new Date(2022, MONTHS.Oct, 3),
  },

  //#endregion Pro League

  //#region D-League
  {
    title: "D-League Draft",
    type: LEAGUE.dev,
    start: new Date(2022, MONTHS.Oct, 5),
    end: new Date(2022, MONTHS.Oct, 5),
  },
  {
    title: "Regular Season Begins",
    type: LEAGUE.dev,
    start: new Date(2022, MONTHS.Nov, 28),
    end: new Date(2022, MONTHS.Nov, 28),
  },
  {
    title: "Playoffs Begin",
    type: LEAGUE.dev,
    start: new Date(2022, MONTHS.Apr, 21),
    end: new Date(2022, MONTHS.Apr, 21),
  },
  {
    title: "Coach Hiring",
    type: LEAGUE.dev,
    start: new Date(2022, MONTHS.Jun, 25),
    end: new Date(2022, MONTHS.Jun, 26),
  },
  //#endregion D-League
];

export const collegeEvents: SibaEvent[] = [
  // #region RECRUITING
  {
    ...recruiting.eval,
    start: new Date(2022, 0, 1),
    end: new Date(2022, 2, 18),
  },
  {
    ...recruiting.contact,
    start: new Date(2022, 2, 19),
    end: new Date(2022, 2, 25),
  },
  {
    ...recruiting.quiet,
    start: new Date(2022, 2, 26),
    end: new Date(2022, 3, 1),
  },
  {
    ...recruiting.dead,
    start: new Date(2022, 3, 2),
    end: new Date(2022, 3, 8),
  },
  {
    ...recruiting.contact,
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 30),
  },
  {
    ...recruiting.late,
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 30),
  },
  {
    ...recruiting.none,
    start: new Date(2022, 4, 1),
    end: new Date(2022, 5, 25),
  },
  {
    ...recruiting.quiet,
    start: new Date(2022, 5, 26),
    end: new Date(2022, 6, 2),
  },
  {
    ...recruiting.eval,
    start: new Date(2022, 6, 3),
    end: new Date(2022, 6, 16),
  },
  {
    ...recruiting.dead,
    start: new Date(2022, 6, 17),
    end: new Date(2022, 6, 23),
  },
  {
    ...recruiting.eval,
    start: new Date(2022, 6, 24),
    end: new Date(2022, 6, 30),
  },
  {
    ...recruiting.quiet,
    start: new Date(2022, 6, 31),
    end: new Date(2022, 8, 10),
  },
  {
    ...recruiting.contact,
    start: new Date(2022, 8, 11),
    end: new Date(2022, 9, 8),
  },
  {
    ...recruiting.quiet,
    start: new Date(2022, 9, 9),
    end: new Date(2022, 10, 19),
  },
  {
    ...recruiting.early,
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 19),
  },
  {
    ...recruiting.eval,
    start: new Date(2022, 10, 20),
    end: new Date(2022, 11, 31),
  },

  //#endregion

  //#region SEASON
  {
    title: "Allocate Facilities Budget",
    type: "important",
    start: new Date(2022, 4, 1),
    end: new Date(2022, 4, 1),
  },
  {
    title: "Player Transfer Portal Sessions",
    type: "important",
    start: new Date(2022, 4, 29),
    end: new Date(2022, 5, 22),
  },
  {
    title: "Schedule Summer Camp Travel",
    type: "important",
    start: new Date(2022, 5, 25),
    end: new Date(2022, 5, 25),
  },
  {
    title: "Recruiting Begins",
    type: "important",
    start: new Date(2022, 5, 26),
    end: new Date(2022, 5, 26),
  },
  {
    title: "National Recruit Camps",
    type: "important",
    start: new Date(2022, 6, 4),
    end: new Date(2022, 6, 6),
  },
  {
    title: "Las Vegas Revue Camp (West Region Camp)",
    type: "important",
    start: new Date(2022, 6, 7),
    end: new Date(2022, 6, 9),
  },
  {
    title: "Houston Classic Camp (Great Plains Region Camp)",
    type: "important",
    start: new Date(2022, 6, 11),
    end: new Date(2022, 6, 13),
  },
  {
    title: "Chicago Prep Revue Camp (Midwest Region Camp)",
    type: "important",
    start: new Date(2022, 6, 14),
    end: new Date(2022, 6, 16),
  },
  {
    title: "Memphis Hoop Summit Camp (Southeast Region Camp)",
    type: "important",
    start: new Date(2022, 6, 25),
    end: new Date(2022, 6, 27),
  },
  {
    title: "Big Apple Showcase Camp (Atlantic East Region Camp)",
    type: "important",
    start: new Date(2022, 6, 28),
    end: new Date(2022, 6, 30),
  },
  {
    title: "Scheduling Decisions",
    type: "important",
    start: new Date(2022, 8, 18),
    end: new Date(2022, 8, 18),
  },
  {
    title: "Practice Begins",
    type: "important",
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 2),
  },
  {
    title: "Season Begins",
    type: "important",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 13),
  },
  {
    title: "Preseason Tournaments",
    type: "important",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 11, 25),
  },
  {
    title: "Recruit SAT Scores Finalized",
    type: "important",
    start: new Date(2022, 0, 28),
    end: new Date(2022, 0, 28),
  },
  {
    title: "Conference Tournaments Begin",
    type: "important",
    start: new Date(2022, 2, 5),
    end: new Date(2022, 2, 5),
  },
  {
    title: "Selection Show",
    type: "important",
    start: new Date(2022, 2, 12),
    end: new Date(2022, 2, 12),
  },
  {
    title: "Postseason Tournaments Begin",
    type: "important",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 13),
  },
  {
    title: "Association Awards",
    type: "important",
    start: new Date(2022, 3, 8),
    end: new Date(2022, 3, 8),
  },
  {
    title: "Head Coach Hiring",
    type: "important",
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 9),
  },
  {
    title: "Assistant Coach Hiring",
    type: "important",
    start: new Date(2022, 3, 16),
    end: new Date(2022, 3, 16),
  },
  {
    title: "Meeting with School Board",
    type: "important",
    start: new Date(2022, 3, 23),
    end: new Date(2022, 3, 23),
  },
  //#endregion

  //#region TOURNAMENTS

  {
    title: "Coaches Classic",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 19),
    type: "tournament",
  },
  {
    title: "Preseason CBT Tournament",
    start: new Date(2022, 10, 14),
    end: new Date(2022, 10, 20),
    type: "tournament",
  },
  {
    title: "Hawaiian Shootout",
    start: new Date(2022, 10, 18),
    end: new Date(2022, 10, 20),
    type: "tournament",
  },
  {
    title: "Paradise Invitational",
    start: new Date(2022, 10, 18),
    end: new Date(2022, 10, 20),
    type: "tournament",
  },
  {
    title: "Poseidon's Challenge",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    type: "tournament",
  },
  {
    title: "WSSN Classic",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    type: "tournament",
  },
  {
    title: "Cabo Challenge",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    type: "tournament",
  },
  {
    title: "Alaskan Classic",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    type: "tournament",
  },
  {
    title: "Palmetto Shootout",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    type: "tournament",
  },
  {
    title: "Swish Invitational",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    type: "tournament",
  },
  {
    title: "Sunshine Shootout",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    type: "tournament",
  },
  {
    title: "Golden State Classic",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    type: "tournament",
  },
  {
    title: "Bermuda Bracket",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    type: "tournament",
  },
  {
    title: "Las Vegas Winter Jam",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    type: "tournament",
  },
  {
    title: "Caribbean Challenge",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    type: "tournament",
  },
  {
    title: "Bahama Classic",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    type: "tournament",
  },
  {
    title: "JAG Holiday Invitational",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    type: "tournament",
  },
  {
    title: "Military Memorial",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    type: "tournament",
  },
  {
    title: "South Beach Showcase",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    type: "tournament",
  },
  {
    title: "SICBA Tournament",
    start: new Date(2022, 2, 14),
    end: new Date(2022, 3, 4),
    type: "tournament",
  },
  {
    title: "CBT Tournament",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 30),
    type: "tournament",
  },
  {
    title: "IBI Tournament",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 30),
    type: "tournament",
  },
  {
    title: "USIT Tournament",
    start: new Date(2022, 2, 14),
    end: new Date(2022, 2, 29),
    type: "tournament",
  },
  //#endregion
];

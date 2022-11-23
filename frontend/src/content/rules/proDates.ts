import { LEAGUE, MONTHS } from "@content/constants";
import type { ProEvent } from "@lib/types";

const events: ProEvent[] = [
  //#region Pro League
  {
    title: "D-League Assignments",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 4),
    end: new Date(2022, MONTHS.Oct, 4),
  },
  {
    title: "Regular Season Begins",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 17),
    end: new Date(2022, MONTHS.Oct, 17),
  },
  {
    title: "Trade Deadline",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Feb, 8),
    end: new Date(2022, MONTHS.Feb, 8),
  },
  {
    title: "All-Star Weekend",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Feb, 16),
    end: new Date(2022, MONTHS.Feb, 18),
  },
  {
    title: "Playoff Rosters Finalized",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Apr, 12),
    end: new Date(2022, MONTHS.Apr, 12),
  },
  {
    title: "Playoffs Begins",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Apr, 14),
    end: new Date(2022, MONTHS.Apr, 14),
  },
  {
    title: "Draft Lottery",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 7),
    end: new Date(2022, MONTHS.Jun, 7),
  },
  {
    title: "1st Meeting with Owner",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 18),
    end: new Date(2022, MONTHS.Jun, 18),
  },
  {
    title: "GM Job Hiring",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 19),
    end: new Date(2022, MONTHS.Jun, 19),
  },
  {
    title: "2nd Meeting with Owner",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 20),
    end: new Date(2022, MONTHS.Jun, 20),
  },
  {
    title: "Coach Hiring",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 21),
    end: new Date(2022, MONTHS.Jun, 24),
  },
  {
    title: "Rookie Combine",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 26),
    end: new Date(2022, MONTHS.Jun, 26),
  },
  {
    title: "Team Workouts for Rookies",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 27),
    end: new Date(2022, MONTHS.Jun, 27),
  },
  {
    title: "College Draft",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 28),
    end: new Date(2022, MONTHS.Jun, 28),
  },
  {
    title: "Contract Deadlines",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jun, 30),
    end: new Date(2022, MONTHS.Jun, 30),
  },
  {
    title: "Summer League Rosters Set",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 2),
    end: new Date(2022, MONTHS.Jul, 2),
  },
  {
    title: "Summer League Play",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 3),
    end: new Date(2022, MONTHS.Jul, 15),
  },
  {
    title: "Free Agency",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Jul, 16),
    end: new Date(2022, MONTHS.Aug, 4),
  },
  {
    title: "Deadline to Sign 2nd Round Picks",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Aug, 4),
    end: new Date(2022, MONTHS.Aug, 4),
  },
  {
    title: "Dealine for Rookie Options",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Sep, 30),
    end: new Date(2022, MONTHS.Sep, 4),
  },
  {
    title: "Training Camp",
    league: LEAGUE.pro,
    start: new Date(2022, MONTHS.Oct, 3),
    end: new Date(2022, MONTHS.Oct, 3),
  },

  //#endregion Pro League

  //#region D-League
  {
    title: "D-League Draft",
    league: LEAGUE.development,
    start: new Date(2022, MONTHS.Oct, 5),
    end: new Date(2022, MONTHS.Oct, 5),
  },
  {
    title: "Regular Season Begins",
    league: LEAGUE.development,
    start: new Date(2022, MONTHS.Nov, 28),
    end: new Date(2022, MONTHS.Nov, 28),
  },
  {
    title: "Playoffs Beign",
    league: LEAGUE.development,
    start: new Date(2022, MONTHS.Apr, 21),
    end: new Date(2022, MONTHS.Apr, 21),
  },
  {
    title: "Coach Hiring",
    league: LEAGUE.development,
    start: new Date(2022, MONTHS.Jun, 25),
    end: new Date(2022, MONTHS.Jun, 26),
  },
  //#endregion D-League

  //#region Euro League
  {
    title: "Domestic League Regular Season Begins",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Nov, 4),
    end: new Date(2022, MONTHS.Nov, 4),
  },
  {
    title: "Major Cup Play Begins",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Nov, 9),
    end: new Date(2022, MONTHS.Nov, 9),
  },
  {
    title: "Minor Cup Play Begins",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Nov, 29),
    end: new Date(2022, MONTHS.Nov, 29),
  },
  {
    title: "Domestic League Playoffs Begin",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.May, 13),
    end: new Date(2022, MONTHS.May, 13),
  },
  {
    title: "1st Meeting with Owner",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Jun, 18),
    end: new Date(2022, MONTHS.Jun, 18),
  },
  {
    title: "GM Job Hiring",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Jun, 19),
    end: new Date(2022, MONTHS.Jun, 19),
  },
  {
    title: "2nd Meeting with Owner",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Jun, 20),
    end: new Date(2022, MONTHS.Jun, 20),
  },
  {
    title: "Coach Hiring",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Jun, 25),
    end: new Date(2022, MONTHS.Jun, 26),
  },
  {
    title: "Free Agency",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Jul, 16),
    end: new Date(2022, MONTHS.Aug, 4),
  },
  {
    title: "Training Camp",
    league: LEAGUE.european,
    start: new Date(2022, MONTHS.Oct, 3),
    end: new Date(2022, MONTHS.Oct, 3),
  },
];

export default events;

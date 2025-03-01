import type { CollegeEvent } from "@lib/types";
import { RECRUITING_STATES, TOURNAMENT_TYPE } from "../../../lib/constants";

const events: CollegeEvent[] = [
  //#region RECRUITING
  {
    title: RECRUITING_STATES.Evaluation,
    start: new Date(2022, 0, 1),
    end: new Date(2022, 2, 18),
  },
  {
    title: RECRUITING_STATES.Contact,
    start: new Date(2022, 2, 19),
    end: new Date(2022, 2, 25),
  },
  {
    title: RECRUITING_STATES.Quiet,
    start: new Date(2022, 2, 26),
    end: new Date(2022, 3, 1),
  },
  {
    title: RECRUITING_STATES.Dead,
    start: new Date(2022, 3, 2),
    end: new Date(2022, 3, 8),
  },
  {
    title: RECRUITING_STATES.Contact,
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 30),
  },
  {
    title: RECRUITING_STATES.LateLOI,
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 30),
  },
  {
    title: RECRUITING_STATES.None,
    start: new Date(2022, 4, 1),
    end: new Date(2022, 5, 25),
  },
  {
    title: RECRUITING_STATES.Quiet,
    start: new Date(2022, 5, 26),
    end: new Date(2022, 6, 2),
  },
  {
    title: RECRUITING_STATES.Evaluation,
    start: new Date(2022, 6, 3),
    end: new Date(2022, 6, 16),
  },
  {
    title: RECRUITING_STATES.Dead,
    start: new Date(2022, 6, 17),
    end: new Date(2022, 6, 23),
  },
  {
    title: RECRUITING_STATES.Evaluation,
    start: new Date(2022, 6, 24),
    end: new Date(2022, 6, 30),
  },
  {
    title: RECRUITING_STATES.Quiet,
    start: new Date(2022, 6, 31),
    end: new Date(2022, 8, 10),
  },
  {
    title: RECRUITING_STATES.Contact,
    start: new Date(2022, 8, 11),
    end: new Date(2022, 9, 8),
  },
  {
    title: RECRUITING_STATES.Quiet,
    start: new Date(2022, 9, 9),
    end: new Date(2022, 10, 19),
  },
  {
    title: RECRUITING_STATES.EarlyLOI,
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 19),
  },
  {
    title: RECRUITING_STATES.Evaluation,
    start: new Date(2022, 10, 20),
    end: new Date(2022, 11, 31),
  },

  //#endregion

  //#region SEASON
  {
    title: "Allocate Facilities Budget",
    start: new Date(2022, 4, 1),
    end: new Date(2022, 4, 1),
  },
  {
    title: "Player Transfer Portal Sessions",
    start: new Date(2022, 4, 29),
    end: new Date(2022, 5, 22),
  },
  {
    title: "Schedule Summer Camp Travel",
    start: new Date(2022, 5, 25),
    end: new Date(2022, 5, 25),
  },
  {
    title: "Recruiting Begins",
    start: new Date(2022, 5, 26),
    end: new Date(2022, 5, 26),
  },
  {
    title: "National Recruit Camps",
    start: new Date(2022, 6, 4),
    end: new Date(2022, 6, 6),
  },
  {
    title: "Las Vegas Revue Camp (West Region Camp)",
    start: new Date(2022, 6, 7),
    end: new Date(2022, 6, 9),
  },
  {
    title: "Houston Classic Camp (Great Plains Region Camp)",
    start: new Date(2022, 6, 11),
    end: new Date(2022, 6, 13),
  },
  {
    title: "Chicago Prep Revue Camp (Midwest Region Camp)",
    start: new Date(2022, 6, 14),
    end: new Date(2022, 6, 16),
  },
  {
    title: "Memphis Hoop Summit Camp (Southeast Region Camp)",
    start: new Date(2022, 6, 25),
    end: new Date(2022, 6, 27),
  },
  {
    title: "Big Apple Showcase Camp (Atlantic East Region Camp)",
    start: new Date(2022, 6, 28),
    end: new Date(2022, 6, 30),
  },
  {
    title: "Scheduling Decisions",
    start: new Date(2022, 8, 18),
    end: new Date(2022, 8, 18),
  },
  {
    title: "Practice Begins",
    start: new Date(2022, 9, 2),
    end: new Date(2022, 9, 2),
  },
  {
    title: "Season Begins",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 13),
  },
  {
    title: "Preseason Tournaments",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 11, 25),
  },
  {
    title: "Recruit SAT Scores Finalized",
    start: new Date(2022, 0, 28),
    end: new Date(2022, 0, 28),
  },
  {
    title: "Conference Tournaments Begin",
    start: new Date(2022, 2, 5),
    end: new Date(2022, 2, 5),
  },
  {
    title: "Selection Show",
    start: new Date(2022, 2, 12),
    end: new Date(2022, 2, 12),
  },
  {
    title: "Postseason Tournaments Begin",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 13),
  },
  {
    title: "Association Awards",
    start: new Date(2022, 3, 8),
    end: new Date(2022, 3, 8),
  },
  {
    title: "Head Coach Hiring",
    start: new Date(2022, 3, 9),
    end: new Date(2022, 3, 9),
  },
  {
    title: "Assistant Coach Hiring",
    start: new Date(2022, 3, 16),
    end: new Date(2022, 3, 16),
  },
  {
    title: "Meeting with School Board",
    start: new Date(2022, 3, 23),
    end: new Date(2022, 3, 23),
  },
  //#endregion

  //#region TOURNAMENTS

  {
    title: "Coaches Classic",
    start: new Date(2022, 10, 13),
    end: new Date(2022, 10, 19),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Preseason CBT Tournament",
    start: new Date(2022, 10, 14),
    end: new Date(2022, 10, 20),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Hawaiian Shootout",
    start: new Date(2022, 10, 18),
    end: new Date(2022, 10, 20),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Paradise Invitational",
    start: new Date(2022, 10, 18),
    end: new Date(2022, 10, 20),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Poseidon's Challenge",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "WSSN Classic",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Cabo Challenge",
    start: new Date(2022, 10, 21),
    end: new Date(2022, 10, 23),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Alaskan Classic",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Palmetto Shootout",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Swish Invitational",
    start: new Date(2022, 10, 25),
    end: new Date(2022, 10, 27),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Sunshine Shootout",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Golden State Classic",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Bermuda Bracket",
    start: new Date(2022, 11, 9),
    end: new Date(2022, 11, 11),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Las Vegas Winter Jam",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Caribbean Challenge",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Bahama Classic",
    start: new Date(2022, 11, 16),
    end: new Date(2022, 11, 18),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "JAG Holiday Invitational",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "Military Memorial",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "South Beach Showcase",
    start: new Date(2022, 11, 23),
    end: new Date(2022, 11, 25),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.preseason,
  },
  {
    title: "SICBA Tournament",
    start: new Date(2022, 2, 14),
    end: new Date(2022, 3, 4),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.postseason,
  },
  {
    title: "CBT Tournament",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 30),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.postseason,
  },
  {
    title: "IBI Tournament",
    start: new Date(2022, 2, 13),
    end: new Date(2022, 2, 30),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.postseason,
  },
  {
    title: "USIT Tournament",
    start: new Date(2022, 2, 14),
    end: new Date(2022, 2, 29),
    tournament: true,
    tournamentType: TOURNAMENT_TYPE.postseason,
  },
  //#endregion
];

export default events;

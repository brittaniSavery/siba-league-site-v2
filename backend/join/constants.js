const Offense = {
  key: "offense",
  label: {
    pro: "Evaluating Offense",
    college: "Offensive Concepts",
  },
};

const Defense = {
  key: "defense",
  label: {
    pro: "Evaluating Defense",
    college: "Defensive Concepts",
  },
};

const Potential = {
  key: "potential",
  label: {
    pro: "Evaluating Potential",
  },
};

const GameStrategy = {
  key: "gameStrategy",
  label: {
    pro: "Game Strategy",
  },
};

const PlayerDev = {
  key: "playerDev",
  label: {
    pro: "Player Development",
    college: "Player Development",
  },
};

const Scouting = {
  key: "scouting",
  label: {
    college: "Scouting Ability",
  },
};

const Recruiting = {
  key: "recruiting",
  label: {
    college: "Recruiting Ability",
  },
};

const COLLEGE_PERSONALITY = [
  "ambition",
  "academics",
  "discipline",
  "integrity",
  "temper",
];

const PRO_LEAGUE_INFO = {
  abbv: "the SIBA",
  singleMember: "general manager",
  pointLabels: [Offense, Defense, Potential, GameStrategy, PlayerDev],
  pictureFolder: "nonplayers",
};

const COLLEGE_LEAGUE_INFO = {
  abbv: "the SICBA",
  singleMember: "head coach",
  pointLabels: [Offense, Defense, Scouting, Recruiting, PlayerDev],
  pictureFolder: "coaches",
};

module.exports = {
  Offense,
  Defense,
  PlayerDev,
  Potential,
  GameStrategy,
  Scouting,
  Recruiting,
  PRO_LEAGUE_INFO,
  COLLEGE_LEAGUE_INFO,
};

import { LEAGUE } from "@lib/constants";
import type { ChildrenProps, ProTeam, School } from "@lib/types";
import { createContext, useState } from "react";
import type { CollegeForm, ProForm } from "../lib";

type TeamsProviderProps = ChildrenProps & {
  pro: ProTeam[];
  college: School[];
};

type FormTeams = {
  available: { pro: ProTeam[]; college: School[] };
  selected?: { pro?: ProForm; college?: CollegeForm[] };
};

export type TeamsContext = {
  formTeams: FormTeams;
  add: (type: LEAGUE, team: ProForm | CollegeForm) => void;
  remove: (type: LEAGUE, id?: number) => void;
  update: (type: LEAGUE, team: ProForm | CollegeForm) => void;
};

export const TeamsContext = createContext<TeamsContext | null>(null);

export function TeamsProvider({ pro, college, children }: TeamsProviderProps) {
  const [formTeams, setFormTeams] = useState<FormTeams>({
    available: { pro, college },
  });

  const add = (type: LEAGUE, team: ProForm | CollegeForm) => {
    if (type === LEAGUE.pro) {
      const pro = team as ProForm;
      setFormTeams({ ...formTeams, selected: { pro: pro } });
    } else {
      const college = team as CollegeForm;
      const current = formTeams.selected?.college || [];

      current.push(college);

      setFormTeams({ ...formTeams, selected: { college: current } });
    }
  };

  const remove = (type: LEAGUE, id?: number) => {
    if (type === LEAGUE.pro)
      setFormTeams({ ...formTeams, selected: { pro: undefined } });
    else {
      if (!formTeams.selected?.college) return;

      const removed = formTeams.selected.college.filter(
        (t) => t.team.id !== id
      );

      setFormTeams({ ...formTeams, selected: { college: removed } });
    }
  };

  const update = (type: LEAGUE, team: ProForm | CollegeForm) => {
    if (type === LEAGUE.pro) add(type, team);
    else {
      remove(type, team.team.id);
      add(type, team);
    }
  };

  const contextValue = {
    formTeams,
    add,
    remove,
    update,
  };

  return (
    <TeamsContext.Provider value={contextValue}>
      {children}
    </TeamsContext.Provider>
  );
}

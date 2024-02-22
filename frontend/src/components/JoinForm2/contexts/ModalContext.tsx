import { createContext, useReducer } from "react";
import { LEAGUE } from "@lib/constants";
import type { CollegeForm, ProForm } from "../lib";
import type { ChildrenProps, ProTeam, School } from "@lib/types";

export const ACTION_TYPES = {
  add: "add",
  edit: "edit",
  open: "open",
  close: "close",
  change: "change",
} as const;

const initModal: Modal = {
  open: false,
  mode: "add",
  league: LEAGUE.pro,
};

type Action = {
  type: keyof typeof ACTION_TYPES;
  league?: LEAGUE;
  team?: ProForm | CollegeForm;
};

type Modal = {
  open: boolean;
  mode: "add" | "edit";
  league: LEAGUE;
  selectedTeam?: ProForm | CollegeForm;
};

export const ModalContext = createContext<Modal>(initModal);
export const ModalDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

export function ModalProvider({ children }: ChildrenProps) {
  const [modal, dispatch] = useReducer(modalReducer, initModal);

  return (
    <ModalContext.Provider value={modal}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

function modalReducer(modal: Modal, action: Action): Modal {
  const { type, team, league } = action;

  switch (type) {
    case ACTION_TYPES.open:
      return { ...modal, open: true };
    case ACTION_TYPES.close:
      return { ...modal, open: false };
    case ACTION_TYPES.add:
      return { ...modal, mode: "add" };
    case ACTION_TYPES.edit:
      return { ...modal, mode: "edit", selectedTeam: team };
    case ACTION_TYPES.change:
      return { ...modal, league: league || LEAGUE.pro };
  }
}

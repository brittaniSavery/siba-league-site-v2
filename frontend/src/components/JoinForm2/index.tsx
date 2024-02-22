import type { ProTeam, School } from "@lib/types";
import { ModalProvider } from "./contexts/ModalContext";
import { TeamsProvider } from "./contexts/TeamsContext";
import MainForm from "./MainForm";

type JoinForm2Props = {
  pro: ProTeam[];
  college: School[];
};

export default function JoinForm2({ pro, college }: JoinForm2Props) {
  return (
    <TeamsProvider pro={pro} college={college}>
      <ModalProvider>
        <MainForm />
        {/* 
      {<ProModal availableTeams={pro} />}
      <CollegeModal availableTeams={college} /> */}
      </ModalProvider>
    </TeamsProvider>
  );
}

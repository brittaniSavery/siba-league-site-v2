import {
  AutoComplete,
  Input,
  Password,
  Select,
} from "@components/FormControls";
import type { School } from "@lib/types";
import { useForm } from "react-hook-form";
import { LOW_HIGH, type CollegeForm } from "../lib";
import BaseModal from "./BaseModal";
import { useContext } from "react";
import {
  ACTION_TYPES,
  ModalContext,
  ModalDispatchContext,
} from "../contexts/ModalContext";
import { LEAGUE } from "@lib/constants";

type CollegeModalProps = {
  availableTeams: School[];
};

export default function CollegeModal({ availableTeams }: CollegeModalProps) {
  const { control, handleSubmit } = useForm<CollegeForm>();
  const { open, mode, selectedTeam: team } = useContext(ModalContext);
  const dispatch = useContext(ModalDispatchContext);

  const onSubmit = (data: CollegeForm) => console.log(data);

  if (!dispatch) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseModal
        close={() => dispatch({ type: ACTION_TYPES.close })}
        isOpen={open}
        htmlSection="college"
        member="head coach"
        type={LEAGUE.college}
        mode={mode}
      >
        <AutoComplete<CollegeForm, School>
          id="teamselect"
          options={availableTeams}
          colSize="half"
          name="team"
          control={control}
          renderOption={(school) => (
            <p>
              {school.name} {school.mascot}
              <span className="help">
                Tier {school.tier} | Region: {school.region}
              </span>
            </p>
          )}
        />
        <Password name="password" control={control} colSize="half" />
        <p className="column is-full is-size-5">Head Coach Basics</p>
        <Input
          name="firstName"
          label="First Name"
          control={control}
          colSize="half"
        />
        <Input
          name="lastName"
          label="Last Name"
          control={control}
          colSize="half"
        />
        <Input
          name="age"
          type="number"
          min={25}
          max={75}
          control={control}
          colSize="one-third"
          help="Range: 25-75"
        />
        <Input
          name="face"
          label="Face Picture Number"
          type="number"
          min={1}
          max={1022}
          control={control}
          colSize="one-third"
          help="Fill in the number of the matching picture from graphics/coaches/fac."
        />
        <Input
          name="clothes"
          label="Outfit Picture Number"
          type="number"
          min={1}
          max={1022}
          control={control}
          colSize="one-third"
          help="Fill in the number of the matching picture from graphics/coaches/clothes."
        />
        <div className="column content is-full">
          <p className="is-size-5">Head Coach Personality</p>
          <p>
            These are the different aspects of the coach's personality. For
            Ambition, Integrity, and Temper, the level indicates the amount a
            coach has for the corresponding category. For Academics and
            Discipline, the level determines how important the category is to
            the coach. For example, a coach with low academics will not care too
            much if players have low GPAs.
          </p>
        </div>
        <Select
          name="ambition"
          control={control}
          options={LOW_HIGH}
          colSize="one-fifth"
        />
        <Select
          name="academics"
          control={control}
          options={LOW_HIGH}
          colSize="one-fifth"
        />
        <Select
          name="discipline"
          control={control}
          options={LOW_HIGH}
          colSize="one-fifth"
        />
        <Select
          name="integrity"
          control={control}
          options={LOW_HIGH}
          colSize="one-fifth"
        />
        <Select
          name="temper"
          control={control}
          options={LOW_HIGH}
          colSize="one-fifth"
        />
      </BaseModal>
    </form>
  );
}

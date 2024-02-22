import { LEAGUE } from "@lib/constants";
import clsx from "clsx";
import type { CollegeForm, ProForm } from "./lib";
import { useContext } from "react";
import {
  ACTION_TYPES,
  ModalContext,
  ModalDispatchContext,
} from "./contexts/ModalContext";

type TeamPicksProps = {
  selectedPro: ProForm | undefined;
  selectedCollege: CollegeForm[] | undefined;
};

export default function TeamPicks({
  selectedPro,
  selectedCollege,
}: TeamPicksProps) {
  const {
    league,
    availableTeams: { pro },
  } = useContext(ModalContext);
  const dispatch = useContext(ModalDispatchContext);

  if (!dispatch) return null;

  return (
    <div className="pb-4">
      <div className="content mt-5">
        <h2>Pick Your Teams</h2>
        <p>
          This is where your team choices will appear after adding them by
          clicking the &quot;Add&quot; button for pro or college teams. Feel
          free to only add a pro league or just some college teams. At least one
          team is required before submitting the form.
        </p>
      </div>

      <div className="card is-shadowless">
        <div className="has-background-light pt-2 px-2 mb-0 tabs is-boxed">
          <ul>
            <li className={clsx(league === LEAGUE.pro && "is-active")}>
              <a
                onClick={() =>
                  dispatch({ type: ACTION_TYPES.change, league: LEAGUE.pro })
                }
              >
                Pro
              </a>
            </li>
            <li className={clsx(league === "college" && "is-active")}>
              <a
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.change,
                    league: LEAGUE.college,
                  })
                }
              >
                College
              </a>
            </li>
          </ul>
        </div>
        <div className="card-content">
          <div className={clsx(league !== LEAGUE.pro && "is-hidden")}>
            {!!pro.length ? (
              <>
                <p>
                  You are able to manage only one (1) pro team with the option
                  to manage its corresponding D-League team.
                </p>
                <button
                  type="button"
                  className="button is-primary is-light mt-3"
                  onClick={() => {
                    dispatch({ type: ACTION_TYPES.add });
                    dispatch({ type: ACTION_TYPES.open });
                  }}
                >
                  Add Pro Team
                </button>
              </>
            ) : (
              <div className="message is-danger">
                <p className="message-header">Pro Leage Full</p>
                <p className="message-body">
                  Thanks for your interest in the pro league. Unfortuantly,
                  there are no pro teams available. All 32 teams are managed by
                  human GMs. A team may open due to inactivity, so please try
                  again later.
                </p>
              </div>
            )}
          </div>

          <div className={clsx(league !== LEAGUE.college && "is-hidden")}>
            <p>
              You are allowed to coach up to three (3) teams. They each must be
              in different tiers and different recruiting regions.
            </p>
            <button
              type="button"
              className="button is-primary is-light mt-3"
              onClick={() => {
                dispatch({ type: ACTION_TYPES.add });
                dispatch({ type: ACTION_TYPES.open });
              }}
            >
              Add College Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

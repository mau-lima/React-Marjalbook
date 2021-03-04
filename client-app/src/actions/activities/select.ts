import { Dispatch } from "redux";
import { ReduxDispatch } from "../..";
import Agent from "../../app/api/agent";
import { setActivityProps } from "../../app/common/util/util";
import { IRootState } from "../../app/models/rootState";
import { setActivityBeingDeleted } from "../activityBeingDeleted/set";
import { setLoading } from "../loading/set";
import { getUser } from "../user/get";

export const selectActivity = (activityUUID: string | null) => async (
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  const state = getState();
  const user = state.user || await dispatch(getUser());;

  let activity = null;
  if (activityUUID) {
    activity = state.activities.find((act) => act.id === activityUUID); //do we already have it?
    if (!activity) {
      //if not, get it
      activity = await Agent.Activities.details(activityUUID);
      setActivityProps(activity, user);
    }
  }
  console.log(activity);
  dispatch({ type: "ACTIVITY_SELECTED", payload: activity });
  return Promise.resolve(activity);
};

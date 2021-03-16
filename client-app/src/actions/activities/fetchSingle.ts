import { ReduxDispatch } from "../..";
import Agent from "../../app/api/agent";
import { setActivityProps } from "../../app/common/util/util";
import { IRootState } from "../../app/models/rootState";
import { setLoading } from "../loading/set";
import { getUser } from "../user/get";

export const fetchSingleActivity = (activityUUID: string | null) => async (
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
  dispatch({ type: "SINGLE_ACTIVITY_FETCHED", payload: activity });
  return Promise.resolve(activity);
};

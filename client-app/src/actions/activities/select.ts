import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IRootState } from "../../app/modules/rootState";
import { setLoading } from "../loading/set";

export const selectActivity = (activityUUID: string | null) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  let activity = null;
  if (activityUUID) {
    const state = getState();
    activity = state.activities.find((act) => act.id === activityUUID); //do we already have it?
    if (!activity) {
      //if not, get it
      dispatch(setLoading(true));
      try {
        activity = await Activities.details(activityUUID);
      } catch (error) {
        activity = null;
      }
    }
    dispatch(setLoading(false));
  }

  dispatch({ type: "ACTIVITY_SELECTED", payload: activity });
};

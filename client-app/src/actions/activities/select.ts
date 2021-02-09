import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IRootState } from "../../app/modules/rootState";
import { setLoading } from "../loading/set";

export const selectActivity = (activityUUID: string | null) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  if (activityUUID) {
    const state = getState();
    if (state.selectedActivity && state.selectedActivity.id === activityUUID)
      //anti-double-fetch
      return;

    let activity = state.activities.find((act) => act.id === activityUUID); //do we already have it?
    if (!activity) {
      //if not, get it
      dispatch(setLoading(true));
      try {
        activity = await Activities.details(activityUUID);
        dispatch({ type: "ACTIVITY_SELECTED", payload: activity });
      } catch (error) {
        console.log(error);
        dispatch({ type: "ACTIVITY_SELECTED", payload: null });
        throw error;
      }
    }
    dispatch(setLoading(false));
  } else {
    dispatch({ type: "ACTIVITY_SELECTED", payload: null });
  }
};

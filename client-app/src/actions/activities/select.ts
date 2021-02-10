import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IRootState } from "../../app/modules/rootState";
import { setLoading } from "../loading/set";

export const selectActivity = (activityUUID: string | null) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();


  let activity = null;
  if (activityUUID) {
    
    activity = state.activities.find((act) => act.id === activityUUID); //do we already have it?
    if (!activity) {
      //if not, get it
      dispatch(setLoading(true));
      activity = await Activities.details(activityUUID);
      activity.date = new Date(activity.date);
      dispatch(setLoading(false));
      
    }
  }
  console.log(activity);
  dispatch({ type: "ACTIVITY_SELECTED", payload: activity });
  return Promise.resolve(activity);
};

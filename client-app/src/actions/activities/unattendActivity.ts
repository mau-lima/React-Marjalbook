import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { IActivity } from "../../app/models/activity";
import { IRootState } from "../../app/models/rootState";
import { setLoading } from "../loading/set";
import { Agent } from "../../app/api/agent";

//this action creator returns a thunk
export const unattendActivity = (activity: IActivity) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();
  try{
    await Agent.Activities.unattend(activity.id);
    activity.attendees = activity.attendees.filter(a => a.username !== state.user!.username);
    activity.isGoing = false;
    dispatch({ type: "ACTIVITY_ATTENDEE_DELETED", payload: activity });
    return Promise.resolve();
  }catch(err){
    toast.error("Problem canceling attendance to activity");
  }
};

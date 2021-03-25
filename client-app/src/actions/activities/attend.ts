import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { Agent } from "../../app/api/agent";
import { createAttendee } from "../../app/common/util/util";
import { IActivity } from "../../app/models/activity";
import { IRootState } from "../../app/models/rootState";

//this action creator returns a thunk
export const attendActivity = (activity: IActivity) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();
  const attendee = createAttendee(state.user!);

  try {
    await Agent.Activities.attend(activity.id);
    activity.attendees.push(attendee);
    activity.isGoing = true;
    dispatch({ type: "ACTIVITY_ATTENDEE_ADDED", payload: activity });
    return Promise.resolve();
  } catch (err) {
    toast.error("Problem signing up to activity");
  }
};

import { toast } from "react-toastify";
import { Dispatch } from "redux";
import Agent from "../../app/api/agent";
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
  if (activity) {
    activity.attendees.push(attendee);
    activity.isGoing = true;
    dispatch({ type: "ACTIVITY_ATTENDEE_ADDED", payload: activity });
    return Promise.resolve();
  }
  else{
      console.log(`Error while setting attendance status for an activity`);
  }
  //   try {
  // await Agent.Activities.update(activity);

  //   } catch (error) {
  //     console.log("Error!!");
  //     console.log(error.response);
  //     toast.error("Problem submitting data");
  //   }
};

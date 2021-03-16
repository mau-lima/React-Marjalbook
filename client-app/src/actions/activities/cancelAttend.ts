import { Dispatch } from "redux";
import { IActivity } from "../../app/models/activity";
import { IRootState } from "../../app/models/rootState";

//this action creator returns a thunk
export const cancelAttend = (activity: IActivity) => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state = getState();
  if (activity) {
    activity.attendees = activity.attendees.filter(a => a.username !== state.user!.username);
    activity.isGoing = false;
    dispatch({ type: "ACTIVITY_ATTENDEE_DELETED", payload: activity });
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

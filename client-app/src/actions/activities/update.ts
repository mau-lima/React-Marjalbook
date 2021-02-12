import { toast } from "react-toastify";
import { Dispatch } from "redux";
import  Agent  from "../../app/api/agent";
import { IActivity } from "../../app/models/activity";

//this action creator returns a thunk
export const updateActivity = (activity: IActivity) => async (
  dispatch: Dispatch
) => {
  try {
    await Agent.Activities.update(activity);
    dispatch({ type: "ACTIVITY_UPDATED", payload: activity });
    return Promise.resolve();
  } catch (error) {
    console.log("Error!!");
    console.log(error.response);
    toast.error("Problem submitting data");
  }
};

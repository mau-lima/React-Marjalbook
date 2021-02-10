import { toast } from "react-toastify";
import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IActivity } from "../../app/modules/activity";

//this action creator returns a thunk
export const createActivity = (activity: IActivity) => async (
  dispatch: Dispatch
) => {
  try {
    await Activities.create(activity);
    dispatch({ type: "ACTIVITY_CREATED", payload: activity });
    return Promise.resolve("ok!"); //todo add an error case
  } catch (error) {
    console.log("Error!!");
    console.log(error.response);
    toast.error('Problem submitting data');
  }
};

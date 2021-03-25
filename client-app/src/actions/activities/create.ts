import { toast } from "react-toastify";
import { Dispatch } from "redux";
import  {Agent}  from "../../app/api/agent";
import { createAttendee } from "../../app/common/util/util";
import { IActivity } from "../../app/models/activity";
import { IRootState } from "../../app/models/rootState";

//this action creator returns a thunk
export const createActivity = (activity: IActivity) => async (
  dispatch: Dispatch,
  getState: () => IRootState

) => {
  const state = getState();
  try {
    await Agent.Activities.create(activity);
    if(state.user){
      const attendee = createAttendee(state.user);
      attendee.isHost = true;
      activity.isHost = true;
      activity.attendees = [attendee]; //replicates what is happening internally on the server side
      dispatch({ type: "ACTIVITY_CREATED", payload: activity });
    return Promise.resolve("ok!"); //todo add an error case
    }
    else{
      console.log('Error: no user');
      toast.error('No user logon');
    }
    
    
  } catch (error) {
    console.log("Error!!");
    console.log(error);
    toast.error("Problem submitting data");
  }
};

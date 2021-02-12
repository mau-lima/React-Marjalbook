import { Dispatch } from "redux";
import  Agent  from "../../app/api/agent";
import { setActivityBeingDeleted } from "../activityBeingDeleted/set";

//this action creator returns a thunk
export const deleteActivity = (activityUUID: string) => async (dispatch :Dispatch) =>{
    dispatch(setActivityBeingDeleted(activityUUID));
    await Agent.Activities.delete(activityUUID);
    dispatch(setActivityBeingDeleted(''));
    dispatch({type: 'ACTIVITY_DELETED', payload: activityUUID });
};

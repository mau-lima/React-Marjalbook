import { Dispatch } from "redux";
import  {Agent}  from "../../app/api/agent";
//this action creator returns a thunkf
export const deleteActivity = (activityUUID: string) => async (dispatch :Dispatch) =>{
    await Agent.Activities.delete(activityUUID);
    dispatch({type: 'ACTIVITY_DELETED', payload: activityUUID });
};

import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IActivity } from "../../app/modules/activity";


//this action creator returns a thunk
export const updateActivity = (activity: IActivity) => async (dispatch :Dispatch) =>{
    await Activities.update(activity);
    dispatch({type: 'ACTIVITY_UPDATED', payload: activity });
    return Promise.resolve();
};

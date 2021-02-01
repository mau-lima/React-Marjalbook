import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IActivity } from "../../app/modules/activity";
import { setEditMode } from "../editMode/set";
import { setSubmitting } from "../submitting/set";


//this action creator returns a thunk
export const updateActivity = (activity: IActivity) => async (dispatch :Dispatch) =>{
    dispatch(setSubmitting(true));
    await Activities.update(activity);
    dispatch({type: 'ACTIVITY_UPDATED', payload: activity });
    //dispatch(selectActivity(activity.id)); ...
    dispatch(setSubmitting(false));
    dispatch(setEditMode(false));
    return Promise.resolve();
};

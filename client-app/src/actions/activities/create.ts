import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IActivity } from "../../app/modules/activity";
import { setEditMode } from "../editMode/set";
import { setSubmitting } from "../submitting/set";

//this action creator returns a thunk
export const createActivity = (activity: IActivity) => async (dispatch :Dispatch) =>{
    dispatch(setSubmitting(true));
    await Activities.create(activity);
    dispatch({type: 'ACTIVITY_CREATED', payload: activity });
    dispatch(setSubmitting(false));
    dispatch(setEditMode(false));

    return Promise.resolve('ok!'); //todo add an error case
};

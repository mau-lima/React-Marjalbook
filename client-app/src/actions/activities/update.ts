import { Dispatch } from "redux";
import Activities from "../../app/api/agent";
import { IActivity } from "../../app/modules/activity";
import { IRootState } from "../../app/modules/rootState";
import { setEditMode } from "../editMode/set";
import { setSubmitting } from "../submitting/set";
import { selectActivity } from "./select";


//this action creator returns a thunk
export const updateActivity = (activity: IActivity) => async (dispatch :Dispatch,getState :IRootState) =>{
    dispatch(setSubmitting(true));
    await Activities.update(activity);
    dispatch({type: 'ACTIVITY_UPDATED', payload: activity });
    dispatch(selectActivity(activity));
    dispatch(setSubmitting(false));
    dispatch(setEditMode(false));
};

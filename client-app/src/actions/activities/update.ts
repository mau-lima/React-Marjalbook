import { IActivity } from "../../app/modules/activity";

export const updateActivity = (activity:IActivity) =>{
    return {
        type: 'UPDATE',
        payload: activity
    };
};

// should the parameter be the full Activity? or the parameters...
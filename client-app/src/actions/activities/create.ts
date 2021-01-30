import { IActivity } from "../../app/modules/activity";

export const createActivity = (activity: IActivity ) =>{
    return {
        type: 'CREATE',
        payload: activity
    };
};
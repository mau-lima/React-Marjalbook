import { IActivity } from "../../app/modules/activity";

export const selectActivity = (activity: IActivity | null) =>{
    return {
        type: 'SELECTACTIVITY',
        payload: activity
    };
};
import { IActivity } from "./activity";

export interface IRootState{
    counter: number;
    activities: IActivity[];
    selectedActivity: IActivity | null;
    editMode: boolean;
    loading: boolean;
}
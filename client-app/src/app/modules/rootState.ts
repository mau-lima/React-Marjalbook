import { IActivity } from "./activity";

export interface IRootState{
    counter: number;
    activities: IActivity[];
}
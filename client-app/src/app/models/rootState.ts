import { IActivity } from "./activity";
import { IModalState } from "./modalState";
import { IUser } from "./user";

export interface IRootState{
    counter: number;
    activities: IActivity[];
    loading: boolean;
    user: IUser | null;
    token:string;
    modal:IModalState;
}
import { IActivity } from "./activity";
import { IModalState } from "./modalState";
import { IUser } from "./user";

export interface IRootState{
    counter: number;
    activities: IActivity[];
    selectedActivity: IActivity | null;
    loading: boolean;
    submitting: boolean; //solia manejar si se esta submiteando o no el formulario. Se puede tneer como estaod local. destruir
    activityBeingDeleted: string;
    user: IUser | null;
    token:string;
    modal:IModalState;
}
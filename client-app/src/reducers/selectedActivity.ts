import { IActivity } from "../app/models/activity";

interface IAction {
  type: string;
  payload: IActivity | null;
}

const selectedActivityReducer = (state: null |IActivity = null, action: IAction) => {
  switch (action.type) {
    case "ACTIVITY_SELECTED": {
      return action.payload;
    }
    case "ACTIVITY_ATTENDEE_ADDED": {
      if(action!.payload!.id === state!.id!)
        return {...action.payload}
      else
      return state;
    }
    case "ACTIVITY_ATTENDEE_DELETED": {
      if(action!.payload!.id === state!.id!)
        return {...action.payload}
      else
      return state;
    }
    default: {
      return state;
    }
  }
};

export default selectedActivityReducer;

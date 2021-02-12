import { IActivity } from "../app/models/activity";

interface IAction {
    type: string;
    payload: IActivity | null;
  }
  
  const selectedActivityReducer = (state = null, action: IAction) => {
    switch (action.type) {
      case "ACTIVITY_SELECTED": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default selectedActivityReducer;
  
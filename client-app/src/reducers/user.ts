import { IUser } from "../app/models/user";

interface IAction {
    type: string;
    payload: IUser | null;
  }
  
  const userReducer = (state = null, action: IAction) => {
    switch (action.type) {
      case "USER_UPDATED": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default userReducer;
  
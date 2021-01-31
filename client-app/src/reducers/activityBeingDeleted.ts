interface IAction {
    type: string;
    payload: string;
  }
  
  const activityBeingDeletedReducer = (state = '', action: IAction) => {
    switch (action.type) {
      case "SET_ACTIVITY_BEING_DELETED": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default activityBeingDeletedReducer;
  
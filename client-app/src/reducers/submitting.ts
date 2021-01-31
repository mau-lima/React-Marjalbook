interface IAction {
    type: string;
    payload: boolean;
  }
  
  const submittingReducer = (state = false, action: IAction) => {
    switch (action.type) {
      case "SET_SUBMITTING": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default submittingReducer;
  
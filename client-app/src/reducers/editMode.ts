interface IAction {
    type: string;
    payload: boolean;
  }
  
  const editModeReducer = (state = false, action: IAction) => {
    switch (action.type) {
      case "SET_EDITMODE": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default editModeReducer;
  
interface IAction {
    type: string;
    payload: boolean;
  }
  
  const loadingReducer = (state = true, action: IAction) => {
    switch (action.type) {
      case "SET_LOADING": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default loadingReducer;
  
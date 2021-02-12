
interface IAction {
    type: string;
    payload: string;
  }
  
  const tokenReducer = (state = window.localStorage.getItem('jwt'), action: IAction) => {
    switch (action.type) {
      case "TOKEN_UPDATED": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default tokenReducer;
  
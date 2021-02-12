
interface IAction {
    type: string;
    payload?: any;
  }
  
  const modalReducer = (state = {open:false , body:null}, action: IAction) => {
    switch (action.type) {
      case "OPEN_MODAL": {
        return {open:true, body: action.payload};
      }
      case "CLOSE_MODAL": {
        return {open:false, body: null};
      }
      default: {
        return state;
      }
    }
  };
  
  export default modalReducer;
  
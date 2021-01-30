interface IAction {
  type: string;
  payload: number;
}

const counterReducer = (state = 0, action: IAction) => {
  switch (action.type) {
    case "INCREMENT": {
      console.log("INCREMENT!");
      return state + action.payload;
    }
    case "DECREMENT": {
      console.log("DECREMENT!");
      return state - action.payload;
    }
    default: {
      //ERROR
      console.log("error en counterreducer!");
      return state;
    }
  }
};

export default counterReducer;

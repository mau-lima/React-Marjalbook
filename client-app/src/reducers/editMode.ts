import { findAllByTestId } from "@testing-library/react";

interface IAction {
    type: string;
    payload: boolean;
  }
  
  const editModeReducer = (state = false, action: IAction) => {
    switch (action.type) {
      case "SETEDITMODE": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default editModeReducer;
  
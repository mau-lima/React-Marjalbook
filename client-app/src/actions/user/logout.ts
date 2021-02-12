
import { IRootState } from "../../app/models/rootState";
import { history, ReduxDispatch } from "../.."; //it's from index.tsx
import { removeToken } from "../token/remove";

export const logoutUser = () => async ( // thunk
    dispatch: ReduxDispatch,
    getState: () => IRootState
  ) => {
  
        dispatch({type:"USER_UPDATED", payload: null});
        dispatch(removeToken());
        history.push('/');
        

  };
  
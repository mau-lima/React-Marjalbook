import { Dispatch } from "redux";
import { IRootState } from "../../app/models/rootState";

export const removeToken = () => async ( // thunk
    dispatch: Dispatch,
    getState: () => IRootState
  ) => {
        window.localStorage.removeItem('jwt');
        dispatch({
            type: 'TOKEN_UPDATED',
            payload: null
        });
    // return Promise.resolve(user);
  };
  
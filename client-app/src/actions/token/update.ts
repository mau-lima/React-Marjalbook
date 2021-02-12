import { Dispatch } from "redux";
import { IRootState } from "../../app/models/rootState";

export const updateToken = (token: string) => async ( // thunk
    dispatch: Dispatch,
    getState: () => IRootState
  ) => {
        window.localStorage.setItem('jwt',token);
        dispatch({
            type: 'TOKEN_UPDATED',
            payload: token
        });
    // return Promise.resolve(user);
  };
  
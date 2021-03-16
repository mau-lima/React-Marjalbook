import { Agent } from "../../app/api/agent";
import { IRootState } from "../../app/models/rootState";
import { ReduxDispatch } from "../.."; //it's from index.tsx

export const getUser = () => async (
  // thunk
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  let user = null;
  try{
     user = await Agent.User.current();
     dispatch({ type: "USER_UPDATED", payload: user });
     return Promise.resolve(user);
  }
  catch (err){
    dispatch({ type: "USER_UPDATED", payload: user });
    return Promise.reject(err);
  }
};

import agent from "../../app/api/agent";
import { IRootState } from "../../app/models/rootState";
import { ReduxDispatch } from "../.."; //it's from index.tsx
import { updateToken } from "../token/update";

export const getUser = () => async (
  // thunk
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  
  const user = await agent.User.current();
  dispatch(updateToken(user.token));
  dispatch({ type: "USER_UPDATED", payload: user });
    return Promise.resolve(user);
  // return Promise.resolve(user);
};

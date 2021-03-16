import { Agent } from "../../app/api/agent";
import { IRootState } from "../../app/models/rootState";
import { ReduxDispatch } from "../.."; //it's from index.tsx

export const getUser = () => async (
  // thunk
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  
  const user = await Agent.User.current();
  dispatch({ type: "USER_UPDATED", payload: user });
  return Promise.resolve(user);
};

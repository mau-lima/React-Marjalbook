import agent from "../../app/api/agent";
import { IRootState } from "../../app/models/rootState";
import { IUserFormValues } from "../../app/models/user";
import { history, ReduxDispatch } from "../.."; //it's from index.tsx
import { updateToken } from "../token/update";
import { closeModal } from "../modal/close";

export const loginUser = (values: IUserFormValues) => async (
  // thunk
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  
  const user = await agent.User.login(values);
  dispatch(updateToken(user.token));
  
  dispatch({ type: "USER_UPDATED", payload: user });
  dispatch(closeModal());
  history.push("/activities");

  // return Promise.resolve(user);
};

import agent from "../../app/api/agent";
import { IRootState } from "../../app/models/rootState";
import { IUserFormValues } from "../../app/models/user";
import { history, ReduxDispatch } from "../.."; //it's from index.tsx
import { updateToken } from "../token/update";
import { closeModal } from "../modal/close";

export const registerUser = (values: IUserFormValues) => async (
  // thunk
  dispatch: ReduxDispatch,
  getState: () => IRootState
) => {
  try {
    const user = await agent.User.register(values);
    dispatch(updateToken(user.token));
    dispatch(closeModal());
    history.push("/activities");

    dispatch({ type: "USER_UPDATED", payload: user });
  } catch (error) {
    throw error;
  }

  // return Promise.resolve(user);
};

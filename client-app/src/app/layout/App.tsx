import { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { HomePage } from "../../features/home/HomePage";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { ModalContainer } from "../common/modals/ModalContainer";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../..";
import { setLoading } from "../../actions/loading/set";
import { removeToken } from "../../actions/token/remove";
import { getUser } from "../../actions/user/get";
import token from "../../reducers/token";
import { IRootState } from "../models/rootState";
import { history } from "../..";

const App = ({ location }: RouteComponentProps) => {
  const user = useSelector((state: IRootState) => state.user);
  const loading = useSelector((state: IRootState) => state.loading);
  const dispatch = useThunkDispatch();
  const token = useSelector((state: IRootState) => state.token);

  useEffect(() => {
    if (!token) history.push("/");
    else if (token && !user) {
      dispatch(setLoading(true));
      dispatch(getUser())
        .catch((err) => {
          dispatch(removeToken());
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [dispatch, token, user]);
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/updateActivity/:id"]}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(App);

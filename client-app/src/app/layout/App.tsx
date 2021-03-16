import  { Fragment } from "react";
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
import { LoginForm } from "../../features/user/LoginForm";
import { ModalContainer } from "../common/modals/ModalContainer";

const App = ({ location }: RouteComponentProps) => {
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
                  <Route
                    exact
                    path="/activities"
                    component={ActivityDashboard}
                  />
                  <Route path="/activities/:id" component={ActivityDetails} />
                  <Route
                    key={location.key}
                    path={["/createActivity", "/updateActivity/:id"]}
                    component={ActivityForm}
                  />
                  <Route path="/login" component={LoginForm} />
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

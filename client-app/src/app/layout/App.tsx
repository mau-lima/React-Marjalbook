import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { ActivityForm } from "../../features/activities/form/ActivityForm";
import { HomePage } from "../../features/home/HomePage";
import { ActivityDetails } from "../../features/activities/details/ActivityDetails";

const App = ({ location }: RouteComponentProps) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/updateActivity/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(App);

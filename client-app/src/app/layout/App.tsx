import React, {useEffect, Fragment} from "react";
import { Container } from "semantic-ui-react";
import { Navbar } from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../actions/activities/fetch";
import { IRootState } from "../modules/rootState";

const App = () => {
  //redux
  const dispatch = useDispatch();
  const loading = useSelector((state:IRootState) => state.loading);

  useEffect(() => {
    dispatch(fetchActivities());
  }, []); //the [] argument prevents this from running over and over again

  if (loading) return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
};

export default App;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { fetchActivities } from "../../../actions/activities/fetch";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IRootState } from "../../../app/modules/rootState";
import { CounterDashboard } from "../../counter/CounterDashboard";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: IRootState) => state.loading);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]); //the [] argument prevents this from running over and over again

  if (loading) return <LoadingComponent content="Loading activities..." />;
  else
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          <CounterDashboard />
          <h2>Activity filters will go here!</h2>
        </Grid.Column>
      </Grid>
    ); //?? is the null coalescing operator
};

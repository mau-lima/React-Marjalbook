import  { useEffect } from "react";
import {  useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { useThunkDispatch } from "../../..";
import { fetchAllActivities } from "../../../actions/activities/fetchAll";
import { setLoading } from "../../../actions/loading/set";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IRootState } from "../../../app/models/rootState";
import { CounterDashboard } from "../../counter/CounterDashboard";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = () => {
  const dispatch = useThunkDispatch();
  const loading = useSelector((state: IRootState) => state.loading);
  const user = useSelector((state: IRootState) => state.user);
  
  useEffect(() => {
    if(user){
      dispatch(setLoading(true));
      dispatch(fetchAllActivities()).then(() => dispatch(setLoading(false)));
    }
    
  }, [dispatch,user]); //the [] argument prevents this from running over and over again

  if (loading || !user) return <LoadingComponent content="Loading activities..." />;
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

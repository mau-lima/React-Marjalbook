import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useThunkDispatch } from "../../..";
import { selectActivity } from "../../../actions/activities/select";
import { setLoading } from "../../../actions/loading/set";
import { getUser } from "../../../actions/user/get";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IActivity } from "../../../app/models/activity";
import { IRootState } from "../../../app/models/rootState";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

export const ActivityDetails = ({
  match,
  history
}: RouteComponentProps<DetailParams>) => {
  const activity = useSelector((state: IRootState) => state.selectedActivity)!;
  const dispatcher = useThunkDispatch();
  const loading = useSelector((state: IRootState) => state.loading);
  const user = useSelector((state: IRootState) => state.user);

  const activityId = match.params.id;

  useEffect(() => {
    
    dispatcher(setLoading(true));
    dispatcher(selectActivity(activityId)).then(() => 
    dispatcher(setLoading(false)));
  }, [dispatcher, activityId,history]); //the [] argument prevents this from running over and over again

  if (loading) return <LoadingComponent content="Loading activity..." />;

  if (!activity) return <h2>Activity not found</h2>;

  return (
    //fluid means it takes as much space as it can
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  );
};

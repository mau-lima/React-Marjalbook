import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { selectActivity } from "../../../actions/activities/select";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IRootState } from "../../../app/modules/rootState";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

export const ActivityDetails = ({
  match
}: RouteComponentProps<DetailParams>) => {
  const activity = useSelector((state: IRootState) => state.selectedActivity)!;
  const dispatcher = useDispatch();
  const loading = useSelector((state: IRootState) => state.loading);

  const activityId = match.params.id;

  useEffect(() => {
    dispatcher(selectActivity(activityId));
  }, [dispatcher, activityId]); //the [] argument prevents this from running over and over again

  if (loading || !activity)
    return <LoadingComponent content="Loading activity..." />;
  else
    return (
      //fluid means it takes as much space as it can
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity = {activity}/>
          <ActivityDetailedInfo activity = {activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>
    );
};

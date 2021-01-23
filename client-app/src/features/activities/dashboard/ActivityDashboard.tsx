import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";

interface IProps {
    activities: IActivity[];
}

export const ActivityDashboard = ({activities}: IProps) => {// {activities} is equivalent to activities = props.activities. This is called de-structuring
  return (
    <Grid>
      <Grid.Column width={10}>
        <List>
          {activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
}

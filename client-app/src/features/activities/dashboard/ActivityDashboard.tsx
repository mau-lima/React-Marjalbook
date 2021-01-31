import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { IRootState } from "../../../app/modules/rootState";
import { CounterDashboard } from "../../counter/CounterDashboard";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = () => {
  const editMode = useSelector((state: IRootState) => state.editMode);
  const selectedActivity = useSelector(
    (state: IRootState) => state.selectedActivity
  );

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <CounterDashboard />
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm key={(selectedActivity && selectedActivity.id) || 0} />
        )}
      </Grid.Column>
    </Grid>
  ); //?? is the null coalescing operator
};

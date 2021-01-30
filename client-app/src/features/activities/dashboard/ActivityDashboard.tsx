import React, { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";
import { IRootState } from "../../../app/modules/rootState";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface IProps {

  submitting: boolean;
  target: string;
}

export const ActivityDashboard = ({
  submitting,
  target,
}: IProps) => {
  const editMode = useSelector((state:IRootState) => state.editMode);
  const selectedActivity = useSelector((state:IRootState) => state.selectedActivity);

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          submitting={submitting}
          target = {target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  ); //?? is the null coalescing operator
};

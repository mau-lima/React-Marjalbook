import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { createActivity } from "../../../actions/activities/create";
import { updateActivity } from "../../../actions/activities/update";
import { IRootState } from "../../../app/modules/rootState";
import { RouteComponentProps } from "react-router-dom";
import { selectActivity } from "../../../actions/activities/select";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useThunkDispatch } from "../../..";

interface FormParams {
  id: string;
}

export const ActivityForm = ({
  match,
  history,
}: RouteComponentProps<FormParams>) => {
  const dispatch = useThunkDispatch();

  const loading = useSelector((state: IRootState) => state.loading);
  const selectedActivity = useSelector(
    (state: IRootState) => state.selectedActivity
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      dispatch(selectActivity(match.params.id));
      selectedActivity && setActivity(selectedActivity);
    }

    return () => {
      //cleanup function f
      dispatch(selectActivity(null));
    };
  }, [selectedActivity, dispatch, match.params.id]); //todo rechck ths and select.ts w/video 104 minute 6/9

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    category: "",
    title: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActivity({
      ...activity,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (activity.id.length === 0) {
      let activityWithGuid: IActivity = { ...activity, id: uuid() };
      dispatch(createActivity(activityWithGuid)).then(() => {
        history.push(`/activities/${activityWithGuid.id}`);
        setSubmitting(false);
      });
    } else {
      dispatch(updateActivity(activity)).then(() => {
        history.push(`/activities/${activity.id}`);
        setSubmitting(false);
      });
    }
  };

  if (loading) return <LoadingComponent content="Loading activity..." />;
  else
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
                value={activity.title}
              />
              <Form.TextArea
                onChange={handleInputChange}
                name="description"
                rows={2}
                placeholder="Description"
                value={activity.description}
              />
              <Form.Input
                onChange={handleInputChange}
                name="category"
                placeholder="Category"
                value={activity.category}
              />
              <Form.Input
                onChange={handleInputChange}
                name="date"
                type="date"
                placeholder="Date"
                value={activity.date.split("T")[0]}
              />
              <Form.Input
                onChange={handleInputChange}
                name="city"
                placeholder="City"
                value={activity.city}
              />
              <Form.Input
                onChange={handleInputChange}
                name="venue"
                placeholder="Venue"
                value={activity.venue}
              />
              <Button
                loading={submitting}
                floated="right"
                positive
                type="submit"
                content="Submit"
              />
              <Button
                floated="right"
                type="button"
                content="Cancel"
                onClick={() => {
                  if (activity) history.push(`/activities/${activity.id}`);
                  else history.push(`/activities`);
                }}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
};

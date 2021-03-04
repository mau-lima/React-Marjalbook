import React, { useEffect, useState } from "react";
import { Button, Form,  Grid, Segment } from "semantic-ui-react";
import {
  ActivityFormValues,
  IActivity,
} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { createActivity } from "../../../actions/activities/create";
import { updateActivity } from "../../../actions/activities/update";
import { IRootState } from "../../../app/models/rootState";
import { RouteComponentProps } from "react-router-dom";
import { selectActivity } from "../../../actions/activities/select";
import { useThunkDispatch } from "../../..";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import { DateInput } from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from "revalidate";
import { setLoading } from "../../../actions/loading/set";

const validate = combineValidators({
  title: isRequired({message: 'The title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
  
})

interface FormParams {
  id: string;
}

export const ActivityForm = ({
  match,
  history,
}: RouteComponentProps<FormParams>) => {
  const dispatch = useThunkDispatch();

  const loading = useSelector((state: IRootState) => state.loading);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      dispatch(setLoading(true));
      dispatch(selectActivity(match.params.id)).then((activity) => {
        setActivity(new ActivityFormValues(activity));
        dispatch(setLoading(false));
      });
    }
  }, [dispatch, match.params.id]); //todo rechck ths and select.ts w/video 104 minute 6/9

  const [activity, setActivity] = useState(new ActivityFormValues());

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;

    if (!activity.id) {
      
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

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
          validate = {validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine}) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  options={category}
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    placeholder="Date"
                    date={true}
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    placeholder="Time"
                    time={true}
                    value={activity.time}
                    component={DateInput}
                  />
                </Form.Group>

                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  disabled={loading || invalid || pristine}
                  type="submit"
                  content="Submit"
                />
                <Button
                  floated="right"
                  type="button"
                  disabled={loading}
                  content="Cancel"
                  onClick={() => {
                    if (activity) history.push(`/activities/${activity.id}`);
                    else history.push(`/activities`);
                  }}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

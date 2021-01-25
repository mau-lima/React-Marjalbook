import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm = ({
  setEditMode,
  activity: initialActivity,
  createActivity,
  editActivity,
}: IProps) => {
  const initializeForm = () => {
    if (initialActivity) {
      return initialActivity;
    } else {
      let emptyActivity: IActivity = {
        id: "",
        category: "",
        title: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
      return emptyActivity;
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if ((event.currentTarget.name = "date")) {
      let newDate = activity.date.split('T')[0]+'T'+event.currentTarget.value;
      
      setActivity({
        ...activity,
        date: newDate,
      });
    } else if ((event.currentTarget.name = "time")) {
      let newDate = event.currentTarget.value +'T'+ activity.date.split("T")[1];
      setActivity({
        ...activity,
        date: newDate,
      });
    } else {
      setActivity({
        ...activity,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    }
  };

  const handleSubmit = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let activityWithGuid: IActivity = { ...activity, id: uuid() };
      createActivity(activityWithGuid);
    } else editActivity(activity);
  };

  return (
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
          name="time"
          type="time"
          placeholder="Time"
          value={activity.date.split("T")[1]}
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => {
            setEditMode(false);
          }}
        />
      </Form>
    </Segment>
  );
};

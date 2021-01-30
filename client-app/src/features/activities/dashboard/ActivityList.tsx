import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { deleteActivity } from "../../../actions/activities/delete";
import { selectActivity } from "../../../actions/activities/select";
import { IActivity } from "../../../app/modules/activity";
import { IRootState } from "../../../app/modules/rootState";

interface IProps {
  submitting: boolean;
  target: string
}

export const ActivityList = ({
  submitting,
  target
}: IProps) => {
  const activities = useSelector((state: IRootState) => state.activities);

  const dispatcher = useDispatch();

  return (
    //clearing makes it clear previous floats to prevent weird bevaiour. The segment also creates the nice white background
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}</div>
                <div>{activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  loading={target===activity.id && submitting}
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(event) => {
                    dispatcher(deleteActivity(activity.id));
                    // deleteActivity(event,activity.id);
                  }}
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => {
                    dispatcher(selectActivity(activity));
                  }}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

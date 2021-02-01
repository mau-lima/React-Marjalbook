import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { deleteActivity } from "../../../actions/activities/delete";
import { IActivity } from "../../../app/modules/activity";
import { IRootState } from "../../../app/modules/rootState";


export const ActivityList = () => {
  const activities = useSelector((state: IRootState) => state.activities);
  const activityBeingDeleted = useSelector((state: IRootState) => state.activityBeingDeleted);
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
                  loading={activityBeingDeleted===activity.id}
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => {
                    dispatcher(deleteActivity(activity.id));
                  }}
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  as={Link} to={`/activities/${activity.id}`}
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

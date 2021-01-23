import React from "react";
import { Item, Image, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
}

export const ActivityList = ({ activities, selectActivity }: IProps) => {
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
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => {
                    selectActivity(activity.id);
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

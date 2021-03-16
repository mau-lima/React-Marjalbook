import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { ActivityListItemAttendees } from "./ActivityListItemAttendees";

interface IProps {
  activity: IActivity;
}

export const ActivityListItem = ({ activity }: IProps) => {
  const host = activity.attendees.filter(attendee => attendee.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group key={activity.id}>
          <Item.Image size="tiny" circular src={host.image || `/assets/user.png`} />
          <Item.Content>
            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
            <Item.Description>Hosted by {host.displayName}</Item.Description>
            {activity.isHost && <Item.Description><Label basic color="orange" content="You're hosting this activity"/></Item.Description>}
            {activity.isGoing && !activity.isHost && <Item.Description><Label basic color="green" content="You're going to this activity"/></Item.Description>}
          </Item.Content>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {format(activity.date, 'HH:MM')}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary><ActivityListItemAttendees attendees={activity.attendees}/></Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated="right"
          content="View"
          color="blue"
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

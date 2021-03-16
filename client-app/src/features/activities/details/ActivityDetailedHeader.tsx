import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { useThunkDispatch } from "../../..";
import { attendActivity } from "../../../actions/activities/attend";
import { cancelAttend } from "../../../actions/activities/cancelAttend";
import { IActivity } from "../../../app/models/activity";
import { IRootState } from "../../../app/models/rootState";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface IProps {
  activity: IActivity;
}

export const ActivityDetailedHeader = ({ activity }: IProps) => {
  const dispatch = useThunkDispatch();
  // the basic tag removes the default segment styling
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/updateActivity/${activity.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button onClick={()=>{dispatch(cancelAttend(activity))}}>Cancel attendance</Button>
        ) : (
          <Button color="teal"onClick={()=>{dispatch(attendActivity(activity))}}>Join Activity</Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

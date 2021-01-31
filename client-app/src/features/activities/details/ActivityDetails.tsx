import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";
import { selectActivity } from "../../../actions/activities/select";
import { setEditMode } from "../../../actions/editMode/set";
import { IRootState } from "../../../app/modules/rootState";

export const ActivityDetails = () => {
  const activity = useSelector((state: IRootState) => state.selectedActivity)!;
  const dispatcher = useDispatch();

  return (
    //fluid means it takes as much space as it can
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => 
              dispatcher(setEditMode(true))}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => dispatcher(selectActivity(null))}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

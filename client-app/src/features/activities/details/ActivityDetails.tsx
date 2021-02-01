import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { selectActivity } from "../../../actions/activities/select";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IRootState } from "../../../app/modules/rootState";

interface DetailParams {
  id: string;
}

export const ActivityDetails = ({
  match,
  history,
}: RouteComponentProps<DetailParams>) => {
  const activity = useSelector((state: IRootState) => state.selectedActivity)!;
  const dispatcher = useDispatch();
  const loading = useSelector((state: IRootState) => state.loading);

  const activityId = match.params.id;

  useEffect(() => {
    dispatcher(selectActivity(activityId));
  }, [dispatcher,activityId]); //the [] argument prevents this from running over and over again

  if (loading || !activity)
    return <LoadingComponent content="Loading activity..." />;
  else
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
              as={Link} to={`/updateActivity/${activity.id}`}
              basic
              color="blue"
              content="Edit"
            />
            <Button
              basic
              color="grey"
              content="Cancel"
              onClick={() => {
                dispatcher(selectActivity(null));
                history.push("/activities");
              }}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    );
};

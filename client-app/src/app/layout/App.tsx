import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container, Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../modules/activity";
import { Navbar } from "../../features/nav/navbar";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); //activities = the state itself, and setActivities is the function that sets it

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []); //the [] argument prevents this from running over and over again

  return (
    <Fragment>
      <Navbar />
      <Container style ={{marginTop: '7em'}}>
        <List>
          {activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default App;

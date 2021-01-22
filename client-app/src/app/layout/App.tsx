import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../modules/activity";

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]); //activities = the state itself, and setActivities is the function that sets it

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  },[]); //the [] argument prevents this from running over and over again

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Marjalbook v0.1</Header.Content>
      </Header>
      <List>
        {activities.map((activity: IActivity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;

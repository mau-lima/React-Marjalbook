import React, { Component } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import { IActivity } from "../modules/activity";

interface IState{
  activities: IActivity[];
}

class App extends Component<{},IState> { //1st param = prop type. 2nd param = state type
  readonly state: IState = { //this is needed bc state should be modified by this.setState()
    activities: []
  };

  componentDidMount() {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      this.setState({
        activities: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Marjalbook v0.1</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((activity: IActivity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;

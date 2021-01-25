import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../modules/activity";
import { Navbar } from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]); //activities = the state itself, and setActivities is the function that sets it
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]); // this is an append
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (editedActivity: IActivity) => {
    let otherActivities = [
      ...activities.filter((a) => a.id !== editedActivity.id),
    ];
    setActivities([...otherActivities, editedActivity]);
    setSelectedActivity(editedActivity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string ) => {
      setActivities([...activities.filter(a => a.id !==id)])
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities :IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []); //the [] argument prevents this from running over and over again

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity = {handleDeleteActivity}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;

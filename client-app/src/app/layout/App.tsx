import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../modules/activity";
import { Navbar } from "../../features/nav/navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { CounterDashboard } from "../../features/counter/CounterDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../../actions/activities/fetch";
import { IRootState } from "../modules/rootState";
import { setLoading } from "../../actions/loading/set";

const App = () => {
  //redux
  const activities = useSelector((state: IRootState) => state.activities)
  const dispatch = useDispatch();
  const loading = useSelector((state:IRootState) => state.loading);

  // const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(    null  );
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  //   setEditMode(false);
  // };

  // const handleOpenCreateForm = () => {
  //   setSelectedActivity(null);
  //   setEditMode(true);
  // };

  // const handleCreateActivity = (activity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.create(activity)
  //     .then(() => {
  //       setActivities([...activities, activity]); // this is an append
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //     })
  //     .then(() => setSubmitting(false));
  // };

  // const handleEditActivity = (editedActivity: IActivity) => {
  //   setSubmitting(true);
  //   agent.Activities.update(editedActivity)
  //     .then(() => {
  //       let otherActivities = [
  //         ...activities.filter((a) => a.id !== editedActivity.id),
  //       ];
  //       setActivities([...otherActivities, editedActivity]);
  //       setSelectedActivity(editedActivity);
  //       setEditMode(false);
  //     })
  //     .then(() => setSubmitting(false));
  // };

  // const handleDeleteActivity = (
  //   event: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   setSubmitting(true);
  //   setTarget(event.currentTarget.name);
  //   agent.Activities.delete(id)
  //     .then(() => {
  //       setActivities([...activities.filter((a) => a.id !== id)]);
  //     })
  //     .then(() => setSubmitting(false));
  // };

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(setLoading(false));
    // agent.Activities.list()
    //   .then((response) => {
    //     let activities: IActivity[] = [];
    //     response.forEach((activity) => {
    //       activity.date = activity.date.split(".")[0];
    //       activities.push(activity);
    //     });
    //     setActivities(activities);

    //   })
    //   .then(() => setLoading(false));
  }, []); //the [] argument prevents this from running over and over again

  if (loading) return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <CounterDashboard />
        <ActivityDashboard
          submitting={submitting}
          target={target}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default App;

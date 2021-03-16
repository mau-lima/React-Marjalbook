import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useThunkDispatch } from "../../..";
import { fetchSingleActivity } from "../../../actions/activities/fetchSingle";
import { setLoading } from "../../../actions/loading/set";
import { removeToken } from "../../../actions/token/remove";
import { getUser } from "../../../actions/user/get";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { IRootState } from "../../../app/models/rootState";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

export const ActivityDetails = ({
  match,
  history,
}: RouteComponentProps<DetailParams>) => {
  const allActivities = useSelector((state: IRootState) => state.activities);
  const activityId = match.params.id;
  const activity = allActivities.find((act) => act.id === activityId);

  const dispatch = useThunkDispatch();
  const loading = useSelector((state: IRootState) => state.loading);
  const token = useSelector((state: IRootState) => state.token);
  const user = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    if (!token) history.push("/");
    else {
      if (token && !user) {
        dispatch(setLoading(true));
        dispatch(getUser())
          .then(() => {
            dispatch(fetchSingleActivity(activityId)).then(() =>
              dispatch(setLoading(false))
            );
          })
          .catch(() => {
            //expired token case
            dispatch(removeToken());
            history.push("/");
            dispatch(setLoading(false));
          });
      } else {
        dispatch(fetchSingleActivity(activityId)).then(() =>
          dispatch(setLoading(false))
        );
      }//therehas to be a prettier way to write this
    }
  }, [dispatch, activityId, history, token, user]); //the [] argument prevents this from running over and over again

  if (loading) return <LoadingComponent content="Loading activity..." />;

  if (!activity) return <h2>Activity not found</h2>;

  return (
    //fluid means it takes as much space as it can
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar attendees={activity.attendees} />
      </Grid.Column>
    </Grid>
  );
};

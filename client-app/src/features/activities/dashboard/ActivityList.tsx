import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Item, Label } from "semantic-ui-react";
import { IActivity } from "../../../app/modules/activity";
import { IRootState } from "../../../app/modules/rootState";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList = () => {
  const activities = useSelector((state: IRootState) => state.activities);
  return (
    <Fragment>
      {groupActivitiesByDate(activities).map(([dateGroup, activitiesOnThatDate]) => (
        <Fragment key={dateGroup}>
          <Label size="large" color="blue">
            {dateGroup}
          </Label>
            <Item.Group divided>
              {activitiesOnThatDate.map((activity: IActivity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
    //clearing makes it clear previous floats to prevent weird bevaiour. The segment also creates the nice white background
  );
};

function groupActivitiesByDate(activities: IActivity[]) {
  //should this go elsewhere?
  const sortedActivities = activities.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  return Object.entries(
    sortedActivities.reduce((activities, activity) => {
      const date = activity.date.split("T")[0];
      activities[date] = activities[date]
        ? [...activities[date], activity]
        : [activity];
      return activities;
    }, {} as { [key: string]: IActivity[] })
  );
}

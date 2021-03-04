import { Dispatch } from 'redux';
import  Agent  from "../../app/api/agent";
import { setActivityProps } from '../../app/common/util/util';
import { IActivity } from '../../app/models/activity';
import { IRootState } from '../../app/models/rootState';
import { setLoading } from '../loading/set';

//this action creator returns a thunk
export const fetchActivities = () => async (dispatch :Dispatch, getState: () => IRootState) =>{
    const state = getState();
    const user = state.user!;
    dispatch(setLoading(true));
    const activitiesRaw = await Agent.Activities.list();
    const activities:IActivity[] = []
    activitiesRaw.forEach( activity => {
        setActivityProps(activity,user);
        activities.push(activity);
    });
    dispatch({type: 'ACTIVITIES_FETCHED', payload: activitiesRaw });
    dispatch(setLoading(false));

};

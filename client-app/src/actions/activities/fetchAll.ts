import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxDispatch } from '../..';
import  Agent  from "../../app/api/agent";
import { setActivityProps } from '../../app/common/util/util';
import { IActivity } from '../../app/models/activity';
import { IRootState } from '../../app/models/rootState';
import { setLoading } from '../loading/set';
import { getUser } from '../user/get';

//this action creator returns a thunk
export const fetchAllActivities = () => async (dispatch :ReduxDispatch, getState: () => IRootState) =>{
    const state = getState();
    const user = state.user || await dispatch(getUser());
    
    const activitiesRaw = await Agent.Activities.list();
    const activities:IActivity[] = []
    activitiesRaw.forEach( activity => {
        setActivityProps(activity,user);
        activities.push(activity);
    });
    dispatch({type: 'ACTIVITIES_FETCHED', payload: activitiesRaw });
    return Promise.resolve();

};

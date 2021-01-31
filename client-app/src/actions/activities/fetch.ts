import { Dispatch } from 'redux';
import Activities from '../../app/api/agent'
import { IRootState } from '../../app/modules/rootState';
import { setLoading } from '../loading/set';

//this action creator returns a thunk
export const fetchActivities = () => async (dispatch :Dispatch,getState :IRootState) =>{

    const activities = await Activities.list();
    dispatch({type: 'ACTIVITIES_FETCHED', payload: activities });
    dispatch(setLoading(false));

};

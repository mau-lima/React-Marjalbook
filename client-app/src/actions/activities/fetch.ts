import { Dispatch } from 'redux';
import Activities from '../../app/api/agent'
import { setLoading } from '../loading/set';

//this action creator returns a thunk
export const fetchActivities = () => async (dispatch :Dispatch) =>{
    dispatch(setLoading(true));
    const activities = await Activities.list();
    dispatch({type: 'ACTIVITIES_FETCHED', payload: activities });
    dispatch(setLoading(false));

};

import { Dispatch } from 'redux';
import Activities from '../../app/api/agent'
import { IActivity } from '../../app/modules/activity';
import { setLoading } from '../loading/set';

//this action creator returns a thunk
export const fetchActivities = () => async (dispatch :Dispatch) =>{
    dispatch(setLoading(true));
    const activitiesWithStringDate = await Activities.list();
    const activities:IActivity[] = []
    activitiesWithStringDate.forEach( a => {
        a.date = new Date(a.date);
        activities.push(a);
    });
    dispatch({type: 'ACTIVITIES_FETCHED', payload: activities });
    dispatch(setLoading(false));

};

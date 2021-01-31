import counterReducer from './counter';
import activitiesReducer from './activities';

import { combineReducers} from 'redux';
import editModeReducer from './editMode';
import loadingReducer from './loading';
import selectedActivityReducer from './selectedActivity';
import submittingReducer from './submitting';
import activityBeingDeletedReducer from './activityBeingDeleted';
//reducers are pure functions
const rootReducer = combineReducers({
    counter: counterReducer,
    activities: activitiesReducer,
    editMode: editModeReducer,
    loading: loadingReducer,
    selectedActivity: selectedActivityReducer,
    submitting: submittingReducer,
    activityBeingDeleted: activityBeingDeletedReducer
});

export default rootReducer;
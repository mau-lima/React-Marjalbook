import counterReducer from './counter';
import activitiesReducer from './activities';

import { combineReducers} from 'redux';
import editModeReducer from './editMode';
import loadingReducer from './loading';
import selectedActivityReducer from './selectedActivity';

const rootReducer = combineReducers({
    counter: counterReducer,
    activities: activitiesReducer,
    editMode: editModeReducer,
    loading: loadingReducer,
    selectedActivity: selectedActivityReducer
});

export default rootReducer;
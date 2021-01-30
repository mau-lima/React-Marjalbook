import counterReducer from './counter';
import activitiesReducer from './activities';

import { combineReducers} from 'redux';

const rootReducer = combineReducers({
    counter: counterReducer,
    activities: activitiesReducer
});

export default rootReducer;
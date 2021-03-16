import counterReducer from './counter';
import activitiesReducer from './activities';

import { combineReducers} from 'redux';
import loadingReducer from './loading';
import userReducer from './user';
import tokenReducer from './token';
import modalReducer from './modal';
//reducers are pure functions
const rootReducer = combineReducers({
    counter: counterReducer,
    activities: activitiesReducer,
    loading: loadingReducer,
    user: userReducer,
    token: tokenReducer,
    modal: modalReducer
});

export default rootReducer;
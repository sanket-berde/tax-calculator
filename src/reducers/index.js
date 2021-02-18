import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import employee from './employee';

const reducers = combineReducers({
    routing: routerReducer,
    employee: employee,
});

export default reducers
import { createStore, combineReducers } from 'redux';

import AuthenticationReducer from './Reducers/User/reducer';
import BetRoomReducer from './Reducers/BetRoom/reducer';

const reducers = combineReducers({
    AuthenticationReducer,
    BetRoomReducer
})

export default createStore(reducers);
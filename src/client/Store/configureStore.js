import { createStore, combineReducers } from 'redux';

import AuthenticationReducer from './Reducers/User/reducer';
import BetRoomReducer from './Reducers/BetRoom/reducer';
import FriendReducer from './Reducers/Friends/reducer';

const reducers = combineReducers({
    AuthenticationReducer,
    BetRoomReducer,
    FriendReducer
})

export default createStore(reducers);
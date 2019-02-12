import { createStore, combineReducers } from 'redux';

import AuthenticationReducer from './Reducers/User/reducer';
import BetRoomReducer from './Reducers/BetRoom/reducer';
import MatchReducer from './Reducers/Match/reducer';
import FriendReducer from './Reducers/Friends/reducer';
import ClassementReducer from './Reducers/Classement/reducer';

const reducers = combineReducers({
    AuthenticationReducer,
    BetRoomReducer,
    FriendReducer,
    MatchReducer,
    ClassementReducer
})

export default createStore(reducers);
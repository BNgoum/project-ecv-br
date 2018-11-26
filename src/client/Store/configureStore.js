import { createStore } from 'redux';

import AuthentificationReducer from './Reducers/AuthentificationReducer';
import SetSignUp from './Reducers/SetSignUp';

export default createStore(AuthentificationReducer);
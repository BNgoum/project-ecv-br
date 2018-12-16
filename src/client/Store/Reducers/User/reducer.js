const initialState = { 
    isLogin: null,
    auth_message_error: "",
    auth_inscription_not_validated: "",
    found_user_by_pseudo: ""
}

function authentication(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'IS_LOGIN':
            nextState = {
                ...state, isLogin: action.value
            }
            return nextState;
        case 'TO_DISCONNECT':
            nextState = {
                ...state, isLogin: action.value
            }
            return nextState;
        case 'AUTH_MESSAGE_ERROR':
            nextState = {
                ...state, auth_message_error: action.value
            }
            return nextState;
        case 'FOUND_USER_BY_PSEUDO':
            nextState = {
                ...state, found_user_by_pseudo: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default authentication;
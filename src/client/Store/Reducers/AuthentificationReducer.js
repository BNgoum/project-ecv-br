const initialState = { isLogin: false }

function toggleScreenAuthentication(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'IS_LOGIN':
            nextState = {
                ...state, isLogin: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default toggleScreenAuthentication;
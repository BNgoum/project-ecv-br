const initialState = { 
    friends: []
}

function betroom(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'SET_FRIENDS':
            nextState = {
                ...state, friends: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default betroom;
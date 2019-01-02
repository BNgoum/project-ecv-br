const initialState = { 
    name: "",
    reward: "",
    owner: "",
    participants: []
}

function betroom(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'SET_NAME':
            nextState = {
                ...state, name: action.value
            }
            return nextState;
        case 'SET_REWARD':
            nextState = {
                ...state, reward: action.value
            }
            return nextState;
        case 'SET_OWNER':
            nextState = {
                ...state, owner: action.value
            }
            return nextState;
        case 'ADD_PARTICIPANT':
            nextState = {
                ...state, participants: action.value
            }
            return nextState;
        case 'DELETE_PARTICIPANT':
            nextState = {
                ...state, participants: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default betroom;
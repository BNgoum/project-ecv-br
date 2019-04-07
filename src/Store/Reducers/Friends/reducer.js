const initialState = { 
    accepted: [],
    pending: [],
    recipient: [],
    auth_message_error: "",
    accepted_request: false,
    friend_request: ""
}

function friend(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'FRIENDS_ACCEPTED':
            nextState = {
                ...state, accepted: action.value
            }
            return nextState;
        case 'FRIENDS_PENDING':
            nextState = {
                ...state, pending: action.value
            }
            return nextState;
        case 'FRIENDS_RECIPIENT':
            nextState = {
                ...state, recipient: action.value
            }
            return nextState;
        case 'FRIENDS_REQUEST':
            nextState = {
                ...state, friend_request: action.value
            }
            return nextState;
        case 'ADD_PENDING':
            nextState = {
                ...state, pending: [...state.pending, action.value]
            }
            return nextState;
        case 'ADD_RECIPIENT':
            nextState = {
                ...state, recipient: [...state.recipient, action.value]
            }
            return nextState;
        case 'DELETE_RECIPIENT':
            nextState = {
                ...state, recipient: action.value
            }
            return nextState;
        case 'ADD_ACCEPTED':
            nextState = {
                ...state, accepted: [...state.accepted, action.value]
            }
            return nextState;
        default:
            return state
    }
}

export default friend;
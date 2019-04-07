const initialState = { 
    name: "",
    reward: "",
    owner: "",
    participants: [],
    numberBets: 0,
    matchs: []
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
        case 'ADD_NUMBER_BETS':
            nextState = {
                ...state, numberBets: action.value
            }
            return nextState;
        case 'DELETE_NUMBER_BETS':
            nextState = {
                ...state, numberBets: action.value
            }
            return nextState;
        case 'ADD_MATCH':
            nextState = {
                ...state, matchs: action.value
            }
            return nextState;
        case 'DELETE_MATCH':
            nextState = {
                ...state, matchs: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default betroom;
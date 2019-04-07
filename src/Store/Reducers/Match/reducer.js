const initialState = { 
    Ligue1: [],
    PremierLeague: [],
    LaLiga: [],
    Bundesliga: [],
    SerieA: [],
    LigueDesChampions: [],
    isActive: "Ligue1",
    matchsPending: []
}

function betroom(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'IS_L1':
            nextState = {
                ...state, Ligue1: action.value
            }
            return nextState;
        case 'IS_PL':
            nextState = {
                ...state, PremierLeague: action.value
            }
            return nextState;
        case 'IS_BU':
            nextState = {
                ...state, Bundesliga: action.value
            }
            return nextState;
        case 'IS_SA':
            nextState = {
                ...state, SerieA: action.value
            }
            return nextState;
        case 'IS_LL':
            nextState = {
                ...state, LaLiga: action.value
            }
            return nextState;
        case 'IS_LDC':
            nextState = {
                ...state, LigueDesChampions: action.value
            }
            return nextState;
        case 'IS_ACTIVE':
            nextState = {
                ...state, isActive: action.value
            }
            return nextState;
        case 'MATCHS_PENDING':
            nextState = {
                ...state, matchsPending: action.value
            }
            return nextState;
        default:
            return state
    }
}

export default betroom;
const initialState = { 
    firstName: "" ,
    lastName: "",
    email: "",
    password: ""
}

function setStateSignUp(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'SET_FIRST_NAME':
            nextState = {
                ...state, firstName: action.value
            }
            return nextState;

        case 'SET_LAST_NAME':
            nextState = {
                ...state, lastName: action.value
            }
            return nextState;

        case 'SET_EMAIL':
            nextState = {
                ...state, email: action.value
            }
            return nextState;

        case 'SET_PASSWORD':
            nextState = {
                ...state, password: action.value
            }
            return nextState;

        default:
            return state
    }
}

export default setStateSignUp;
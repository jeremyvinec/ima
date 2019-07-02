const initialState = { 
    searchedServeur: '',
    searchedPort: '',
    searchedUser: ''
}

function localSettings(state = initialState, action){
    let nextState
    switch (action.type){
        case 'SERVEUR' :
            nextState = {
                ...state,
                searchedServeur: action.value
            }
            return nextState || state
        case 'PORT' :
            nextState = {
                ...state,
                searchedPort: action.value,
            }
            return nextState || state
        case 'USER' : 
            nextState = {
                ...state,
                searchedUser: action.value 
            }
            return nextState || state
        default:
            return state
    }
}

export default localSettings
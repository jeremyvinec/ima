import * as types from '../../actions/actionTypes'
import initialState from './initialState'

function settingsReducer(state = initialState.settings, action){
    let nextState
    switch (action.type) {
        case types.SERVEUR:
            nextState = {
                ...state.searchedServeur,
                searchedServeur: action.value
            }
            nextState || state
        
        case types.PORT:
            nextState = {
                ...state.searchedPort,
                searchedPort: action.value
            }
            nextState || state
            
        case types.USER:
            nextState = {
                ...state.searchedUser,
               searchedUser: action.value
           }
            nextState || state
            
        default:
            return state
    }
}

export default settingsReducer
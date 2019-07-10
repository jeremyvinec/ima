import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function serveurReducer(state = initialState.searchedServeur, action){
    //console.log(state, action)
    switch (action.type) {
        case types.SERVEUR:
            return action.value
        default:
            return state
    }
}
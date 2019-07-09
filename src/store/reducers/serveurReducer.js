import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function serveurReducer(state = initialState.searchedServeur, action){
    switch (action.type) {
        case types.SERVEUR:
            return {
                ...state,
                searchedServeur: {...state.searchedServeur, ...action.value}
            }
        default: 
            return state
    }
}
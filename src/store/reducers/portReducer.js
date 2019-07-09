import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function portReducer(state = initialState.searchedPort, action){
    switch (action.type) {
        case types.PORT:
            return {
                ...state,
                searchedPort: action.port
            }
        default:
            return state
    }
}
import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function userReducer(state = initialState.searchedUser, action){
    switch (action.type) {
        case types.USER:
            return action.value
        default:
            return state
    }
}
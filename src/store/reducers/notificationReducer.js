import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function notificationReducer(state = initialState.notification, action) {
    switch(action.type) {
        case types.NOTIFICATION:
            return action.value
        default:
            return state
    }
} 
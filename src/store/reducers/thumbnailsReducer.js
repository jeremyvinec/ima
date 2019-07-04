import * as types from '../../actions/actionTypes'
import initialState from './initialState'

export default function thumbnailsReducer(state = initialState.thumbnails, action) {
    switch(action.type) {
        case types.LOAD_THUMBNAILS_SUCCESS:
            return action.thumbnails
        default:
            return state
    }
}
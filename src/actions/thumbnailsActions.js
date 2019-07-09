import thumbnailsApi from '../api/thumbnailsApi.js'
import * as types from './actionTypes'

export function loadThumbnailsSuccess(thumbnails) {
    return { type: types.LOAD_THUMBNAILS_SUCCESS, thumbnails}
}

export function loadThumbnails() {
    return dispatch => {
        return thumbnailsApi.getAllThumbnails().then(thumbnails => {
            dispatch(loadThumbnailsSuccess(thumbnails.thumbnails))
        }).catch(error => {
            throw(error)
        })
    }
}
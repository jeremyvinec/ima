import * as types from './actionTypes'

export function deleteThumbnails(index){
    return{
        type: types.DELETE_THUMBNAILS,
        playload: index
    }
}
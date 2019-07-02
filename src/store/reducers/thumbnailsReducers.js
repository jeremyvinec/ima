const initialState = { thumbnails = [] }

function Thumbnails(state = initialState, action){
    let nextState
    switch (action.type){
        case 'THUMBNAILS' :
            nextState = {
                ...state,
                thumbnails : action.value
            }
            return nextState || state
        default:
            return state
    }
}

export default Thumbnails
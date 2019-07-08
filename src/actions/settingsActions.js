import * as types from './actionTypes'

export function serveur(serveur){
    return { type: types.SERVEUR, serveur}
}

export function port(port){
    return { type: types.PORT, port}
}

export function user(user){
    return { type: types.USER, user}
}

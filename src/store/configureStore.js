import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}
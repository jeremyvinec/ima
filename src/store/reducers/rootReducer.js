import thumbnails from './thumbnailsReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage
  }

const rootReducer = persistCombineReducers(rootPersistConfig, {
    thumbnails
})

export default rootReducer
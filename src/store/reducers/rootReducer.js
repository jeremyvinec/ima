import thumbnails from './thumbnailsReducer'
import settings from './settingsReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// configuration de la persistance du state global
const rootPersistConfig = {
    key: 'root',
    storage: storage
  }

const rootReducer = persistCombineReducers(rootPersistConfig, {
    thumbnails, settings
})

export default rootReducer
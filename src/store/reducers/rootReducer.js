import thumbnails from './thumbnailsReducer'
import searchedServeur from './serveurReducer'
import searchedPort from './portReducer'
import searchedUser from './userRecucer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// configuration de la persistance du state global
const rootPersistConfig = {
    key: 'root',
    storage: storage
  }

const rootReducer = persistCombineReducers(rootPersistConfig, {
    thumbnails, searchedServeur, searchedPort, searchedUser
})

export default rootReducer
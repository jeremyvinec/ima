import thumbnails from './thumbnailsReducer'
import searchedServeur from './serveurReducer'
import searchedPort from './portReducer'
import searchedUser from './userRecucer'
import { persistCombineReducers } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage';

// configuration de la persistance du state global
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const rootReducer = persistCombineReducers(rootPersistConfig, {
    thumbnails, searchedServeur, searchedPort, searchedUser
})

export default rootReducer
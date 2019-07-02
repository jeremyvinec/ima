import { createStore } from 'redux'
import localSettings from './reducers/settingsReducers'

export default createStore(localSettings)
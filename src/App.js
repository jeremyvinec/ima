// App.js

import React from 'react'
import Navigation from './navigation/Navigation'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { loadThumbnails } from './actions/thumbnailsActions.js'
import NotifService from './services/NotifService'

// Persister et réhydrater un magasin Redux
import { persistStore } from 'redux-persist'
// Ce component se charge de réhydrater ses components enfants, c'est-à-dire toute notre application ici
import { PersistGate } from 'redux-persist/es/integration/react'

const store = configureStore()

store.dispatch(loadThumbnails())

export default class App extends React.Component {
  render() {
    let persistor = persistStore(store)
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation/>
            <NotifService/>
          </PersistGate>
        </Provider>
    )
  }
}

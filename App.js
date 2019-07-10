// App.js

import React from 'react'
import Navigation from './src/navigation/Navigation'
import configureStore from './src/store/configureStore'
import { Provider } from 'react-redux'
import { loadThumbnails } from './src/actions/thumbnailsActions.js'

// Persister et réhydrater un magasin Redux
import { persistStore } from 'redux-persist'
// Ce component se charge de réhydrater ses components enfants, c'est-à-dire toute notre application ici
import { PersistGate } from 'redux-persist/es/integration/react'

const store = configureStore()

//store.dispatch(loadThumbnails())

export default class App extends React.Component {
  render() {
    let persistor = persistStore(store)
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation/>
          </PersistGate>
        </Provider>
    )
  }
}

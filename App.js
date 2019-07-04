// App.js

import React from 'react'
import Navigation from './src/navigation/Navigation'
import configureStore from './src/store/configureStore'
import { Provider } from 'react-redux'
import { loadThumbnails } from './src/actions/thumbnailsActions.js'

const store = configureStore()

store.dispatch(loadThumbnails())

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Navigation/>
        </Provider>
    )
  }
}

// App.js

import React from 'react'
import Display from './src/components/Display'
import Thumbnails from './src/components/thumbnails/Thumbnails';
import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './src/store/configureSotre'

export default class App extends React.Component {
  render() {
    return (
        <Provider store={Store}>
          <Navigation/>
        </Provider>
    )
  }
}

import React, { Component } from 'react';
import { Provider as  ProviderRedux } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import {store, history, persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'

import Main from './routers/Main'

class App extends Component {

  render() {

    return (
      <ProviderRedux store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <div>
              <Route path="/" component={Main}/>
            </div>
          </ConnectedRouter>
        </PersistGate>
      </ProviderRedux>
    )
  }
}

export default App;

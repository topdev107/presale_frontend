import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Web3Provider, { Connectors } from 'web3-react'
import store from "./store"
import { Provider } from 'react-redux'

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [97] })
const connecters = { MetaMask }

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Web3Provider
          connectors={connecters}
          library={'ethers.js' | 'web3.js' | null}>

          <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
              </Switch>
            </React.Suspense>
          </HashRouter>
        </Web3Provider>
      </Provider>
    )
  }
}

export default App

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import { createStore } from './app/store/createStore'
import history from './app/utils/history'

const store = createStore()

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
        <App />
    </Router>
  </Provider>,
document.getElementById('root'))

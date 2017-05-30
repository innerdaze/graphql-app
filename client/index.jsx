import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import QueryContainer from './components/Query'

if (module.hot) {
  module.hot.accept()
}

async function startApp() {
  const store = await createStore()
  render(
    <Provider store={store}>
      <QueryContainer/>
    </Provider>,
    document.getElementById('root')
  )
}

/* CORDOVA???! 🙀 SECRETS AWAIT */
if (window.cordova) {
  document.addEventListener('deviceready', startApp, false)
} else {
  startApp()
}

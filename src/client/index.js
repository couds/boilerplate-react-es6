import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory ,match} from 'react-router'
import routes from 'routes'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from 'flux/reducers'

require("babel-polyfill")
require('intl')

function run() {
  let store = createStore(reducers)

  match(({routes,location}),() => {
    render(
      <Provider store={store}>
        <Router children={routes} history={browserHistory}/>
      </Provider>
      ,
      document.getElementById('react-app')
    )
  })







}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) != -1 && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
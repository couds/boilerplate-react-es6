import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'flux';
import { Provider } from 'react-redux';

import { Router, browserHistory, match } from 'react-router';
import routes from 'routes';

// Polyfill Intl for Safari Browser (maybe check and import only on safari?)
require('intl');

function run() {
  const element = document.getElementById('initial-state');
  const initialState = JSON.parse(element.innerHTML);
  element.remove();
  const store = createStore(initialState);
  window.test = () => store.getState();
  match(({ routes, location }), () => {
    render(
      <Provider store={store} >
        <Router children={routes} history={browserHistory} />
      </Provider>,
      document.getElementById('react-app')
    );
  });
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}


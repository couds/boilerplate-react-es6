import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'flux';
import { Provider } from 'react-redux';

import { Router, browserHistory as history, match } from 'react-router';
import routes from 'routes';

// Polyfill Intl for Safari Browser (maybe check and import only on safari?)
require('intl');

function run() {
  const element = document.getElementById('initial-state');
  const initialState = JSON.parse(element.innerHTML);
  element.remove();
  const store = createStore(initialState);
  window.test = () => store.getState();
  match(({ routes, history }), (error, redirectLocation, renderProps) => {
    render(
      <Provider store={store} >
        <Router {...renderProps} />
      </Provider>,
      document.getElementById('react-app'),
    );
  });
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}


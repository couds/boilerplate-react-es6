import React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'flux/reducers';

import { Router, browserHistory, match } from 'react-router';
import routes from 'routes';

require('babel-polyfill');
require('intl');

function run() {
  const element = document.getElementById('initial-state');
  const initialState = JSON.parse(element.innerHTML);
  element.remove();
  const store = createStore(reducers, initialState);
  match(({ routes, location }), () => {
    render(
      <Provider store={store} >
        <Router children={routes} history={ browserHistory } />
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


import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import reducers from 'flux/reducers';
import asyncMiddleware from 'flux/middlewares/async';

// eslint-disable-next-line
export function createStore(initialState) {
  return reduxCreateStore(reducers, fromJS(initialState), applyMiddleware(asyncMiddleware));
}

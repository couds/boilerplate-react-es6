import reducers from 'flux/reducers';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import asyncMiddleware from 'flux/middlewares/async';

export function createStore(initialState) {
  return reduxCreateStore(reducers, fromJS(initialState), applyMiddleware(asyncMiddleware));
}

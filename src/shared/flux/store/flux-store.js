import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'flux/middlewares/async';
import { reducers, INITIAL_STATE } from 'flux';

export function createStore(initialState) {
  console.log(initialState || INITIAL_STATE);
  return reduxCreateStore(reducers, initialState || INITIAL_STATE, applyMiddleware(asyncMiddleware));
}
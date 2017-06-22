import { Map, List, fromJS } from 'immutable';
import { LOADING } from 'flux/middlewares/async';
import ACTION_TYPES from 'flux/actions/types';

const INITIAL_STATE = Map({
  locale: Map({
    language: 'en',
    messages: Map(),
    formats: Map(),
  }),
  loading: Map({
    isLoading: false,
    actions: List(),
  }),
  test: Map(),
  test2: Map(),
});

export default function (state = INITIAL_STATE, action = {}) {
  console.log('REDUCER', action);
  switch (action.type) {
    case LOADING:
      return state.update('loading', loading =>
        loading
          .update('actions', (actions) => {
            if (action.payload) {
              return actions.push(action.action);
            }
            return actions.filter(a => a !== action.action);
          })
          .update(isLoading => Map({
            isLoading: isLoading.get('actions').size > 0,
            actions: isLoading.get('actions'),
          })),
      );
    case ACTION_TYPES.INITIAL:
      return state.set('test', fromJS(action.payload));
    case ACTION_TYPES.INITIAL2:
      return state.set('test2', fromJS(action.data2));
    default:
      return state;
  }
}

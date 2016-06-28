import { Map, List } from 'immutable';
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
});

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOADING:
      return state.update('loading', loading =>
        loading
          .update('actions', actions => {
            if (action.payload) {
              return actions.push(action.action);
            }
            return actions.filter(a => a !== action.action);
          })
          .update(loading => {
            return Map({
              isLoading: loading.get('actions').size > 0,
              actions: loading.get('actions'),
            });
          })
      );
    case ACTION_TYPES.ACTION_TYPE:
      console.log('test reducer', action.payload);
      return state;
    default:
      return state;
  }
}

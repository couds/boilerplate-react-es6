import { Map } from 'immutable';
import reducers from './reducers';
import Actions from './actions'
import ACTIONS from './constants';

export const INITIAL_STATE = Map({
  home: 'initial'
});

export default {
  Actions,
  reducers,
  ACTIONS,
  INITIAL_STATE,
}

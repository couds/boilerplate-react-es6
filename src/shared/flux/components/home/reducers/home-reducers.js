import ACTION from '../constants';

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ACTION.INITIAL:
      return state.set('home', action.payload);
    default:
      return state;
  }
}

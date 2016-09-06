import ACTION from '../constants';

export default class HomeActions {
  fetchHomeData() {
    return {
      type: ACTION.INITIAL,
      payload: Promise.resolve({ some: 'object' }),
    };
  }
}

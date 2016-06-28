export const LOADING = '@async/Loading';

export default (store) => dispatch => (action = {
  type: '',
  ignoreLoading: false,
  payload: false,
}) => {
  if (!action.payload) {
    return action;
  }
  const loading = store.getState().loading || (store.getState().get && store.getState().get('loading').toJS());
  if (loading && loading.actions) {
    if (loading.actions.find(a => a === action.type)) {
      console.log(action.payload.cancel);
      return Promise.resolve();
    }
  }
  let promise = undefined;
  let payload = action.payload;
  if (typeof action.payload === 'function') {
    payload = action.payload();
  }
  if ((payload.then && typeof(payload.then) === 'function')) {
    promise = action.payload;
  }
  if (promise) {
    let showLoader = false;
    let finished = false;
    setTimeout(() => {
      if (finished || !process.env.BROWSER || action.ignoreLoading) {
        return;
      }
      showLoader = new Date().getTime();
      dispatch({
        type: LOADING,
        payload: true,
        action: action.type,
      });
    }, 100);
    return new Promise((resolve, reject) => {
      payload.then(data => {
        finished = true;
        dispatch(Object.assign({}, action, { payload: data }));
        if (showLoader) {
          const time = new Date().getTime() - showLoader;
          setTimeout(() => {
            dispatch({
              type: LOADING,
              payload: false,
              action: action.type,
            });
          }, time < 500 ? 500 - time : 0);
        }
        resolve();
      }).catch(err => {
        console.log(err.stack);
        reject(err);
      });
    });
  }
  return action;
};

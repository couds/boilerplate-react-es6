export const LOADING = '@async/Loading';

export default store => next => (action = {
  type: '',
  ignoreLoading: false,
  payload: false,
}) => {
  if (!action.payload) {
    return next(action);
  }
  const loading = store.getState().loading || (store.getState().get && store.getState().get('loading').toJS());

  // Check if the action is already loading
  if (loading &&
      loading.actions &&
      loading.actions.find(a => a === action.type)) {
    return Promise.resolve();
  }

  let promise;
  let payload = action.payload;
  if (typeof action.payload === 'function') {
    payload = action.payload();
  }
  if ((payload.then && typeof (payload.then) === 'function')) {
    promise = payload;
  }
  if (promise) {
    let showLoader = false;
    let finished = false;
    setTimeout(() => {
      if (finished || !process.env.BROWSER || action.ignoreLoading) {
        return;
      }
      showLoader = new Date().getTime();
      next({
        type: LOADING,
        payload: true,
        action: action.type,
      });
    }, 100);
    return new Promise((resolve, reject) => {
      payload.then((data) => {
        finished = true;
        next(Object.assign({}, action, { payload: data }));
        if (showLoader) {
          const time = new Date().getTime() - showLoader;
          setTimeout(() => {
            next({
              type: LOADING,
              payload: false,
              action: action.type,
            });
          }, time < 500 ? 500 - time : 0);
        }
        resolve();
      }).catch((err) => {
        console.log(err.stack);
        reject(err);
      });
    });
  }
  return next(action);
};

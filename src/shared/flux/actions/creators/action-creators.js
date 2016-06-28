import ACTION_TYPES from 'flux/actions/types';

export function actionCreator(params) {
  return {
    type: ACTION_TYPES.INITIAL,
    payload: () => new Promise(resolve => {
      resolve({
        data: 'data',
      });
    }),
  };
}

export function actionCreator2(params) {
  return {
    type: ACTION_TYPES.INITIAL2,
    data2: 'data2',
  };
}
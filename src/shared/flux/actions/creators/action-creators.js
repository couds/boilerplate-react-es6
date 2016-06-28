import ACTION_TYPES from 'flux/actions/types';

export function actionCreator(params) {
  return {
    type: ACTION_TYPES.ACTION_TYPE,
    payload: () => new Promise(resolve => {
      resolve({
        data: 'data',
      });
    }),
  };
}


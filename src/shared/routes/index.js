import React from 'react'
if (typeof require.ensure !== "function") require.ensure = function (d, c) {
  c(require)
};
if (typeof require.include !== "function") require.include = function () {
};


export default [
  {
    path: '/',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        cb(null, require('views/containers/frontOffice/home').default)
      })
    }
  }
]
if (typeof require.ensure !== 'function') { require.ensure = (d, c) => { c(require); }; }

if (typeof require.include !== 'function') { require.include = () => {}; }


export default [
  {
    path: '/',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        cb(null, require('views/components/front-office/home').default);
      });
    },
  },
  {
    path: '/login',
    getComponent: (location, cb) => {
      require.ensure([], (require) => {
        cb(null, require('views/components/front-office/login').default);
      });
    },
  },
];

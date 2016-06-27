import path from 'path';
// import favicon from 'serve-favicon';
//  Framework
import express from 'express';
import compress from 'compression';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

//  Middleware
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

//  React Router

import { match, RouterContext } from 'react-router';
import routes from 'routes';

//  REDUX

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from 'flux/reducers';

const app = express();

// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'react');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3001');


/** @namespace process.env.WEBPACK_DEV */
if (process.env.NODE_ENV !== 'production' || process.env.WEBPACK_DEV) {
  console.log('Serve dev or webpack');
  const httpProxy = require('http-proxy');
  const proxy = httpProxy.createProxyServer();
  app.use('/static', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080/static',
    });
  });
} else {
  console.log('Serve production', path.resolve(
    path.join(__dirname, '..', 'public/')
  ));
  app.use('/static', express.static(path.resolve(
    path.join(__dirname, '..', 'public/')
  )));
}

app.use(helmet.noCache({ noEtag: true }));
app.use(helmet());

app.use((req, res, next) => {
  const location = req.url;
  req.store = createStore(reducers, { initial: true });
  res.render = () => {
    const Layout = require('views/layouts/main').default;
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        error.status = 501;
        return next(error);
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        let HTML = '';
        const promises = renderProps.components.reduce((promises, component) => (
          promises.concat(component.fetchData ?
            component.fetchData(renderProps.params, location.query) :
            [])
        ), []);

        Promise.all(promises)
          .then(actions => {
            actions.map(req.store.dispatch);
            try {
              HTML = renderToString(
                <Provider store={req.store}>
                  <RouterContext {...renderProps} />
                </Provider>
              );
              HTML = renderToStaticMarkup(<Layout store={req.store}>{HTML}</Layout>);
            } catch (err) {
              err.status = 500;
              return next(err);
            }
            return res.status(200).send(
              `<!DOCTYPE html> ${HTML}`);
          });
        return null;
      }
      const err = new Error('no page found');
      err.status = 404;
      return next(err);
    });
  };
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err.message, err.stack);
    res.json(err);
  });
}

// production error handler
// no stacktrace leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err.message, err.stack);
  res.json({
    lala: 'production',
    error: err.message,
    stack: err.stack,
  });
  return next;
});

app.use('*', (req, res) => {
  res.render();
});

// Start Web Server

const debug = require('debug')('React-Sandbox:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Pipe ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

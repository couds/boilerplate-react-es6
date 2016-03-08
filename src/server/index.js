import path from 'path';
import fs from 'fs'
import favicon from 'serve-favicon'
//Framework
import express from 'express'
import compress from 'compression'
import React from 'react'
import {renderToStaticMarkup, renderToString} from 'react-dom/server'


//Middlewares
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'

//React Router

import { match, RouterContext, Router } from 'react-router'
import routes from 'routes'

//REDUX
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducers from 'flux/reducers'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'react');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production' || process.env.WEBPACK_DEV) {

  var httpProxy = require('http-proxy');

  var proxy = httpProxy.createProxyServer();

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./bundler.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.use('/static', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080/static'
    });
  });

} else {
  app.use('/static', express.static('public'));
}


app.use(helmet.noCache({noEtag: true}))
app.use(helmet())


app.use((req, res, next) => {


  let location = req.url

  req.store = createStore(reducers)

  res.render = () => {

    let Layout = require('views/layouts/main').default

    match({routes, location}, (error, redirectLocation, renderProps) => {

        if (error) {
          error.status = 501
          next(error)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          let HTML = "";
          try {
            HTML = renderToString(
              <Provider store={req.store}>
                <RouterContext {...renderProps} />
              </Provider>
            )


            HTML = renderToStaticMarkup(<Layout>{HTML}</Layout>)
          } catch (error) {
            error.status = 500
            return next(error)
          }
          res.status(200).send(
            '<!DOCTYPE html>' + HTML)
        } else {
          let error = new Error('no page found')
          error.status = 404
          next(error)
        }

      }
    )


  }
  next()
})


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err.message, err.stack)
    res.json(err)
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.status(err.status || 500);
  console.log(err.message, err.stack)
  res.json(err)
});


module.exports = app;

app.use('*', (req, res, next) => {

  res.render()
});

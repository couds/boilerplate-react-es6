#!/usr/bin/env node


require('babel-register')({
  sourceMaps: true
});

require('./src/server');

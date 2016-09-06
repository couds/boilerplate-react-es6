var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'intl',
    'babel-polyfill',
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/static/',
    filename: 'javascripts/bundle.js',
    chunkFilename: 'javascripts/[id].bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER' : true,
      },
    }),
    new ExtractTextPlugin('stylesheets/style.css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css', // Run both loaders
      },
      {
        test: /\.json/, // Only .json files
        loader: 'json' // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions: ['', '.js', '.jsx'],
  },
};
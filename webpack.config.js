var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/static/',
    filename: 'javascripts/bundle.js',
    chunkFilename: 'javascripts/[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('stylesheets/style.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ['syntax-object-rest-spread', 'transform-object-assign']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      },
      {
        test: /\.json/, // Only .json files
        loader: 'json' // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src/shared'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      repositories: 'requests'
    }
  }
};

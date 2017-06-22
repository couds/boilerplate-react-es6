var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/static/',
    filename: 'javascripts/bundle.js',
    chunkFilename: 'javascripts/[id].bundle.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    new ExtractTextPlugin({
      filename: 'stylesheets/style.css',
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader' // Run both loaders
      },
      {
        test: /\.json/, // Only .json files
        loader: 'json-loader' // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'src/shared'],
    extensions: ['.js', '.jsx']
  }
};

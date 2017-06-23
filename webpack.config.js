const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = isProduction ? [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    mangle: true,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi], // skip pre-minified libs
  }),
] : [
];


module.exports = {
  devtool: isProduction ? 'sourcemap' : 'cheap-module-eval-source-map',
  entry: [
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/public/',
    filename: 'javascripts/bundle.js',
    chunkFilename: 'javascripts/[id].bundle.js',
    sourceMapFilename: '[name].map',
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    new ExtractTextPlugin({
      filename: 'stylesheets/style.css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks(module) {
        return module.context &&
            (
              module.context.indexOf('node_modules') !== -1 ||
              module.context.indexOf('vendor') !== -1
            );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 4,
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      minRatio: 0,
    }),
    ...plugins,
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css', // Run both loaders
      },
      {
        test: /\.json/, // Only .json files
        loader: 'json', // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src/shared'],
    extensions: ['.js', '.jsx'],
  },
};

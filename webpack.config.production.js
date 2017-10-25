'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '.build/dist'),
    filename: 'bundle.js',
    publicPath: '/.build',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval',
  entry: [
    './node_modules/webpack-hot-middleware',
    './src/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-env',
            'react',
            'stage-2',
          ],
        },
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
};

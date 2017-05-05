/* eslint-disable */
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('config');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: 'inline-source-map',
  target: 'web',
  entry:   [
    'webpack-hot-middleware/client?path=http://' + config.api.host + ':' + config.api.port + '/__webpack_hmr',
    './src/index'
  ],
  output:  {
    path:          path.resolve(__dirname, "public"),
    filename:      "app.js",
    chunkFilename: "[name].[id].js",
    publicPath:    "/"
  },
  module: {

   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: { presets: ['es2015', 'react', 'stage-1'], plugins: ['transform-decorators-legacy' ] },
       },
     },
     {
       test: /\.css$/,
       exclude: /node_modules/,
       use: [
         'style-loader',
         'css-loader'
       ]
     },
     {
       test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url",
       query: {
         limit: 10000,
         mimetype: 'application/font-woff'
       }
     },
     {
       test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url",
       query: {
         limit: 10000,
         mimetype: 'application/font-woff'
       }
     },
     {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url",
       query: {
         limit: 10000,
         mimetype: 'application/octet-stream'
       }
     },
     {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       loader: "url",
       query: {
         limit: 10000,
         mimetype: 'image/svg+xml'
       }
     }
]
 },
 plugins: [
   HtmlWebpackPluginConfig,
   new webpack.HotModuleReplacementPlugin(),
   new webpack.DefinePlugin({
     __CLIENT__: true,
     __SERVER__: false,
     __DEVELOPMENT__: true,
     __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
   }),
 ]
};

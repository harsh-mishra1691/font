const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configrules = require('./wconfig-rules.js');


const serverConfig = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    disableHostCheck: true,
  },
};

module.exports = [serverConfig];

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const configrules = require('./wconfig-rules.js');

const distConfig = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: configrules,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
  ],
  // loaders: [
  //   {
  //     test: /\.jsx?$/,
  //     exclude: /(node_modules|bower_components)/,
  //     loader: 'babel',
  //     query: {
  //       presets: ['react', 'es2015'],
  //     },
  //   },
  //   {
  //     test: /\.html$/,
  //     loader: 'html-loader?attrs[]=video:src',
  //   }, {
  //     test: /\.mp4$/,
  //     loader: 'url?limit=10000&mimetype=video/mp4',
  //   },
  // ],
};

module.exports = [distConfig];

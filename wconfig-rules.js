const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: '/node_modules/',
    use:
    {
      loader: 'babel-loader',
    },
  },
  { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
  { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
  { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpg' },
  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  {
    test: /\.scss$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'sass-loader',
    }],
  },
  {
    // font files
    test: /\.(ttf|eot|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      limit: 40000,
      name: './fonts/[name].[ext]',
    },
  },
  { test: /\.(ogg|mp3|wav|mpe?g)$/i, loader: 'url-loader' },

  {
    test: /\.mp4/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimtetype: 'video/mp4',
      },
    },
  },
  { test: /\.html$/, use: 'html-loader?attrs[]=video:src' },
];

exports.default = rules;
module.exports = exports.default;
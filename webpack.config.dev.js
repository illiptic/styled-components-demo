var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'styled components demo',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'src'),
      options: {
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        plugins: [
          'react-hot-loader/babel'
        ]
      }
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.png$/,
      loaders: ['url-loader'],
      include: path.join(__dirname, 'assets')
    }]
  }
};

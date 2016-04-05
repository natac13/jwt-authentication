const path = require('path')
const webpack = require('webpack')

const ENTRY_FILE = path.join(__dirname, 'app', 'index.js');
// dist/ in tutorial
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    ENTRY_FILE
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/static/' // the path to get the script and style file from when serving.
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ 'style', 'raw' ],
      include: __dirname
    }]
  }
}
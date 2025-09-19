const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:7070',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' }, // /api/?method=... -> /?method=...
      },
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

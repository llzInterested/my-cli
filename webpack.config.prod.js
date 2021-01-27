const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

process.env.NODE_ENV = 'production';

module.exports = merge(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
              },
            }],
          ],
        },
      },

    ],
  },
  plugins: [],
});

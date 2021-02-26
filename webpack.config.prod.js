const { resolve } = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./webpack.config.common');

process.env.NODE_ENV = 'production';

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    jquery: ['jQuery'],
  },
  output: {
    filename: '[name]111.js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[]',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          // 开启多进程打包
          'thread-loader',
          {
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
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露内容名称
      path: resolve(__dirname, 'dll/manifastaaa.json'),
    }),
  ],
});

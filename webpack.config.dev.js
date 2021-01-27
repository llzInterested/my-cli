const { merge } = require('webpack-merge');
const webpack = require('webpack');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const commonConfig = require('./webpack.config.common');

// 设置node环境变量,决定browserslist使用的环境
process.env.NODE_ENV = 'development';
module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设,标识babel做怎样的兼容处理
            presets: [
              // 基本的兼容处理,转换基本语法
              ['@babel/preset-env',
                {
                // 按需加载
                  useBuiltIns: 'usage',
                  // 指定core-js版本
                  corejs: {
                    version: 3,
                  },
                  // 指定兼容做到哪个浏览器版本
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
      },

    ],
  },
  plugins: [
    new EslintWebpackPlugin({ fix: true }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 4000,
    open: true,
    hot: true,
  },
});

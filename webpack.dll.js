const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    // key:最终打包生成的名称, value:要打包的库名
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包后的库对外暴露的名称
  },
  plugins: [
    // 打包生成一个manifest.json,提供和jquery的映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射文件中暴露的名称
      path: resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
};

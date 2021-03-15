const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPresetEnv = require('postcss-preset-env');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

// 可重用的css loader
const commonCssLoader = [
  // css文件单独打包
  MiniCssExtractPlugin.loader,
  'css-loader',
  // 样式兼容处理
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          // postcss的插件
          PostCssPresetEnv,
        ],
      },
    },
  },
];

module.exports = {
  entry: resolve(__dirname, './src/index.js'),
  // entry: {
  //   main: resolve(__dirname, './src/index.js'),
  //   a: resolve(__dirname, './src/a.js'),
  // },
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash:10].js',
  },
  module: {
    rules: [
      {
        // 只匹配数组中的一个loader
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [
              ...commonCssLoader,
              'less-loader',
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              ...commonCssLoader,
              'sass-loader',
            ],
          },
          {
            test: /.(jpg|png|gif|jpeg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
            },
          },
          {
            test: /.html$/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(css|less|sass|scss|js|html|jpg|jpeg|gif|png)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './src/index.html'),
      // 压缩html
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 删除旧的 ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
    // 告诉webpack哪些库不参与打包
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出并在html中自动引入
    new AddAssetHtmlWebpackPlugin({
      publicPath: './',
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  /**
   * 可以将node_modules中的库单独打包一个chunk最终输出
   * 如果多入口chunk中引入了相同的包，只会打包一个单独的chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  // externals: {
  //   jquery: 'jQuery',
  // },
};

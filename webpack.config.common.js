const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPresetEnv = require('postcss-preset-env');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
  entry: [resolve(__dirname, './src/index.js')],
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
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
      filename: 'css/main.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
};

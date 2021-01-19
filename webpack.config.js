const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "./src"),
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "dist.js",
  },
  module: {
    rules: [
      // {
      //   test: /.css$/,
      //   use: [resolve(__dirname, "./loaders/my-style-loader.js"), "css-loader"],
      // },
      { test: /.css$/, use: ["style-loader", "css-loader"] },
      { test: /.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /.js$/,
        use: [
          resolve(__dirname, "loaders/simple-loader.js"),
          resolve(__dirname, "loaders/simple-loader2.js"),
          resolve(__dirname, "loaders/simple-loader3.js"),
        ],
      },
      {
        test: /.(jpg|jpeg|gif|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./build/index.html"),
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, "./dist"),
    port: 3000,
    compress: true,
  },
};

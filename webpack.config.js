const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/app.html",
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader , "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "./dist/",
                name: "[name].[ext]?[hash]",
              }
            },
       ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            publicPath: './dist/', 
            name: '[name].[ext]?[hash]',
            limit: 5000 // 5kb 미만 파일만 data url로 처리 
          }
        }
      },
    ],
  },
  mode: "development", // webpack-dev-server에만 쓰는 것은 아님. 더 알아보세요!
  devtool: "inline-source-map",// webpack-dev-server에만 쓰는 것은 아님. 더 알아보세요!
  devServer: {
    contentBase: "./dist",
    port: 8080,
    hot: true,
  },
};

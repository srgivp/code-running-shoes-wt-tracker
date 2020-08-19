const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = env => {
  return {
    plugins: [
      new htmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new webpack.DefinePlugin({
        "process.env.PUBLIC_URL": JSON.stringify(env.PUBLIC_URL),
        "process.env.SERVER_URL": JSON.stringify(env.SERVER_URL)
        //"process.env.SERVER_URL": "https://running-shoes-tracker.herokuapp.com"
        //"process.env.SERVER_URL": JSON.stringify("http://localhost:3000")
      })
    ],
    output: {
      publicPath: process.env.PUBLIC_URL
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[path][name].[hash].[ext]"
            }
          }
        }
      ]
    },
    externals: {
      puppeteer: 'require("puppeteer")',
      fs: 'require("fs")'
    },
    devServer: {
      historyApiFallback: true
    }
  };
};

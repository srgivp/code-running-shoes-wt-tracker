const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    publicPath: "/"
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
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  externals: {
    puppeteer: 'require("puppeteer")',
    fs: 'require("fs")'
  },
  devServer: {
    historyApiFallback: true
  }
};

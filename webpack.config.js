const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ['main'],
    }),
    new ModuleFederationPlugin({
      name: 'mf_header',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header',
      },
    })
  ],
}
const path = require("path")
const nodeExternals = require("webpack-node-externals")
const webpack = require("webpack")

const { NODE_ENV = "production" } = process.env

module.exports = {
  entry: "./dist/src/index.js",
  mode: NODE_ENV,
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  resolve: {
    extensions: ["", ".js", ".json"],
  },
  stats: {
    errorDetails: true,
  },
}

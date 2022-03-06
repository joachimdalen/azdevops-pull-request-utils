var path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./dist/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    library: "pull-request-comments",
    libraryTarget: "umd",
    filename: "index.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./icon.png", to: "icon.png" },
        { from: "./task.json", to: "task.json" },
      ],
    }),
  ],
};

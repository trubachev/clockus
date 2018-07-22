var path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js")
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    hot: true
  },
  mode: "development"
};

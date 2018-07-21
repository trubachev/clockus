var path = require("path")

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true
  },
  mode: "development"
};

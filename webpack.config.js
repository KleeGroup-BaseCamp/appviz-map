const path = require('path');

module.exports = {
  mode: "development",
  watch: true,
  entry: './js/sketch.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader" 
      },
    ]
  }
};
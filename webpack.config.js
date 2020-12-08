const path = require('path');

module.exports = {
  mode: "development",
  entry: './ts/appViz/app.ts',
  devtool: 'inline-source-map',
  devServer: {
      publicPath: '/dist/',
      contentBase: '.', // default
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
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
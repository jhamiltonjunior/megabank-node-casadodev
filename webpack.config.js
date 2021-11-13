const path = require('path')

module.exports = {
  mode: 'production',
  // caso queira desenvolver o front end
  entry: path.resolve(__dirname, 'frontend', 'js', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  devtool: 'source-map'
}

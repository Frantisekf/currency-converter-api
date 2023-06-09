const path = require('path')

module.exports = {
  entry: '/src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000
  },
  target: 'node'
}

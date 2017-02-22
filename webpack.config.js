const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function () {
  return {
    entry: {
      main: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'source-map',
    devServer: {
      // host: '192.168.1.105',
      port: 8080,
      publicPath: '/dist/',
      noInfo: true,
      // historyApiFallback: true,
    },
    plugins: [
      new ExtractTextPlugin({filename: 'bundle.css', disable: false, allChunks: true})
    ]
  }
}

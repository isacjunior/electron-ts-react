const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mergeWebpack = require('webpack-merge')

const renderer = {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    renderer: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      containers: path.resolve(__dirname, './src/containers'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Stacker',
      template: './src/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
}

const main = mergeWebpack(renderer, {
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
  plugins: [],
})

module.exports = [renderer, main]


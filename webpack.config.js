const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('./ManifestPlugin');

module.exports = {
  mode: 'production',
  entry: {
    1: "./src/1.js",
    2: "./src/2.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new ManifestPlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // default: 30000
      minChunks: 1,
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          // test: /[\\/]node_modules[\\/]/,
          // name: "vendors",
          // chunks: "initial",
          priority: -10
        },
        // default: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
};

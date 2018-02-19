const Uglify = require("uglifyjs-webpack-plugin");

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: './bin/src/common/app.js',
    output: {
      filename: './bin/bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        }
      ]
    },
    plugins: PROD ? [
      new Uglify()
    ] : []
};
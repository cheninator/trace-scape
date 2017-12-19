module.exports = {
    entry: './bin/src/common/app.js',
    output: {
      filename: './bin/bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        }
      ]
    }
};
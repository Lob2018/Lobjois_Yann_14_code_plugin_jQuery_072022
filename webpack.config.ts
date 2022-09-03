module.exports = {
    entry: './src/index.js',
    output: {
      path: `${__dirname}/lib`,
      filename: 'index.tsx',
      library: 'react-dropdown-component-library',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
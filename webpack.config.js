const path = require('path');

module.exports = {
    entry: {
        'content-scripts/main': './src/content-scripts/main.ts',

        'background': './src/background-scripts/main.ts',

        'options-page/main': './src/options-page/main.ts',
        
        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.svg$/i,
            use: 'raw-loader',
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
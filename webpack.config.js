import { resolve } from 'path';
import { CleanWebpackPlugin } from "clean-webpack-plugin";


export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  let output;

  if (isProduction) {
    output = {
      path: resolve('dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    }
  } else {
    output = {
      path: resolve('test/dist'),
      filename: '[name].js',
      publicPath: '/',
    };
  }

  return {
    entry: './client/index.js',
    output,
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all', // Code splitting for shared dependencies
      },
    },
  };
};

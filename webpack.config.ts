const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

type moduleProps = { mode: string };

const isReactRouterDomUsed = (() => {
  try {
    require.resolve('react-router-dom');
    return true;
  } catch (error) {
    return false;
  }
})();

module.exports = (argv: moduleProps) => {
  const isProduction = argv.mode === 'production';
  const publicPath = isReactRouterDomUsed ? '/' : null;

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `assets/[name]${isProduction ? '.[contenthash]' : ''}.js`,
      chunkFilename: `assets/[name]${isProduction ? '.[contenthash]' : ''}.js`,
      publicPath,
    },
    target: 'web',
    devServer: {
      port: 4600,
      proxy: { '/api': { target: 'http://localhost:8800', secure: false, changeOrigin: true } },
      static: { directory: path.join(__dirname, 'src'), publicPath },
      open: true,
      hot: !isProduction,
      liveReload: !isProduction,
      historyApiFallback: { index: '/', rewrites: [{ from: /^\/index.html$/, to: '/index.html' }, { from: /./, to: '/index.html' }] },
    },
    resolve: { extensions: ['.js', '.ts', '.tsx', '.json'] },
    module: {
      rules: [
        { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: { loader: 'esbuild-loader', options: { loader: 'tsx', target: 'es2015', minify: isProduction } } },
        { test: /\.(c|sa|sc)ss$/, exclude: /\.module\.(c|sa|sc)ss$/, use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader', 'esbuild-loader'] },
        { test: /\.module\.(c|sa|sc)ss$/, use: ['style-loader', { loader: 'css-loader', options: { modules: true } }, 'sass-loader', 'esbuild-loader'] },
        { test: /\.(png|jpe?g|gif|svg|webp)$/i, type: 'asset/resource', generator: { filename: 'images/[name].[contenthash][ext]' } },
        { test: /\.(mp4|webm|ogg|ogv)$/i, type: 'asset/resource', generator: { filename: 'videos/[name].[contenthash][ext]' } },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new webpack.ProvidePlugin({ React: 'react', ReactDOM: 'react-dom' }),
      new CopyWebpackPlugin({ patterns: [{ from: 'src/images', to: 'images' }, { from: 'src/videos', to: 'videos' }] }),
      new Dotenv(),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: isProduction } } })],
      splitChunks: { chunks: 'all', minSize: 258, cacheGroups: { defaultVendors: { test: /[\\/]node_modules[\\/]/, priority: -10 }, default: { minChunks: 10, priority: -20, reuseExistingChunk: true } } },
    },
    performance: { hints: isProduction ? 'warning' : false, maxAssetSize: 100 * 1024, maxEntrypointSize: 100 * 1024 },
    cache: { type: 'filesystem' },
    stats: 'errors-warnings',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};

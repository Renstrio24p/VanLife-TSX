const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

type moduleProps = {
  mode: string;
};

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
  const devServerOptions = {
    port: 4600,
    proxy: {
      '/api': {
        target: 'http://localhost:8800',
        secure: false,
        changeOrigin: true,
      },
    },
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath
    },
    open: true,
    hot: !isProduction,
    liveReload: !isProduction,
    historyApiFallback: true,
  };

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
      chunkFilename: isProduction ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
      publicPath
    },
    target: 'web',
    devServer: devServerOptions,
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        
        // TypeScript rule
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx', // Specify the loader for TypeScript
              target: 'es2015',
              // Minify in production
              minify: isProduction,
            },
          },
        },
        // CSS rule
        {
          test: /\.(c|sa|sc)ss$/,
          exclude: /\.module\.(c|sa|sc)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        // CSS modules rule
        {
          test: /\.module\.(c|sa|sc)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            'sass-loader',
          ],
        },
        // Image assets rule
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[contenthash][ext]',
          },
        },
        // Video assets rule
        {
          test: /\.(mp4|webm|ogg|ogv)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'videos/[name].[contenthash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/images',
            to: 'images',
          },
          {
            from: 'src/videos',
            to: 'videos',
          },
        ],
      }),
      new Dotenv(),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all', // Split all chunks, including async and initial
        minSize: 0, // Always split, no matter the size
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 713 * 1024, // Adjust this limit as needed
      maxEntrypointSize: 713 * 1024, // Adjust this limit as needed
    },
    cache: {
      type: 'filesystem',
    },
    stats: 'errors-warnings',
    // Add source maps for better debugging in development mode
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};

import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default (env = {dev: true}) => {

  return {
    context: path.join(__dirname, 'app'),
    entry: {
      app: './scripts/app.js',
      app2: './scripts/app2.js',
      vendor: ['jquery']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.[hash].js'
    },
    externals: ['window'], //used to attach things like jQuery to window in development phase
    devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, './dist/'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        },
        env.dev ? {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: 'last 1 chrome version'
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        } : {
          test: /\.s?css$/,
          include: [
            path.resolve(__dirname, 'app/styles'),
            path.resolve(__dirname, 'node_modules/prismjs/themes')
          ],
          loader: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                  }),
                  cssnano
                ]
              }
            },
            {
              loader: 'sass-loader',
            }
          ])
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        inject: 'body',
        excludeChunks: ['app2'],
        minify: env.prod ? {
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
        } : false,
      }),
      new HtmlWebpackPlugin({
        filename: 'index2.html',
        template: './index2.html',
        inject: 'body',
        excludeChunks: ['app'],
        minify: env.prod ? {
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
        } : false,
      }),
      env.prod ? new ExtractTextPlugin({
        filename: '[name].bundle.[hash].css',
        disable: false,
        allChunks: true
      }) : undefined,
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        chunks: ['app', 'app2']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      //with this you don't need to import jQuery all around
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ].filter(p => !!p)
  }
}

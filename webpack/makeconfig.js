var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NotifyPlugin = require('webpack-plugin-notifier');
var constants = require('./constants');

var devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';


module.exports = function (isDevelopment) {

  var entry = {
    // wordCloud: 'main',
    force: 'pages/force',
    'echarts-all/map': 'pages/echarts-all/map'
  };

  for (var k in entry) {
    entry[ k ] = isDevelopment ? [
      'webpack-dev-server/client?http://localhost:8888',
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server',
      path.join(constants.SRC_DIR, entry[ k ])
    ] : [
      path.join(constants.SRC_DIR, entry[ k ])
    ];
  }

  var config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: entry,
    output: isDevelopment ? {
      path: path.join(constants.BUILD_DIR, 'assets'),
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: 'http://localhost:8888/'
    } : {
      path: path.join(constants.BUILD_DIR, 'assets'),
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
      loaders: [ {
        exclude: /node_modules/,
        loaders: isDevelopment ? [ 'react-hot', 'babel-loader' ] : [ 'babel-loader' ],
        test: /\.js$/
      }, {
        loader: 'url-loader?limit=100000', test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
      }, {
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'), test: /\.css$/
      } ]
    },
    plugins: (function () {
      var plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (isDevelopment) {
        plugins.push(
          NotifyPlugin,
          new webpack.HotModuleReplacementPlugin()
        );
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app.css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            // keep_fnames prevents function name mangling.
            // Function names are useful. Seeing a readable error stack while
            // being able to programmatically analyse it is priceless. And yes,
            // we don't need infamous FLUX_ACTION_CONSTANTS with function name.
            // It's ES6 standard polyfilled by Babel.
            /* eslint-disable camelcase */
            compress: {
              keep_fnames: true,
              screw_ie8: true,
              warnings: false // Because uglify reports irrelevant warnings.
            },
            mangle: {
              keep_fnames: true
            }
            /* eslint-enable camelcase */
          })
        );
      }
      return plugins;
    })(),
    resolve: {
      extensions: [ '', '.js', '.json' ],
      modulesDirectories: [ 'node_modules' ],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  };

  return config;
};

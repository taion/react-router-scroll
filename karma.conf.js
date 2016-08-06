const webpack = require('webpack');

module.exports = config => {
  const { env } = process;

  config.set({
    frameworks: ['mocha'],

    files: ['test/index.js'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          __DEV__: true,
        }),
      ],
      devtool: 'cheap-module-inline-source-map',
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch',
    },

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome', 'Firefox'],
  });
};

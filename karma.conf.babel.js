import webpack from 'webpack';

export default config => {
  const { env } = process;

  const isCi = env.CONTINUOUS_INTEGRATION === 'true';

  config.set({
    frameworks: ['mocha'],

    files: ['./test/index.js'],

    preprocessors: {
      './test/index.js': ['webpack', 'sourcemap'],
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
        }),
      ],
      devtool: 'inline-source-map',
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['mocha'],

    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    browsers: isCi ? [env.BROWSER] : ['Chrome', 'Firefox'],

    singleRun: isCi,
  });
};
